package main

import (
	"net/http"
	"github.com/janberktold/sse"
	"gopkg.in/confluentinc/confluent-kafka-go.v1/kafka"
	"html/template"
	"encoding/json"
	"time"
	"fmt"
)

func main() {

	http.HandleFunc("/event", Listener) 
	http.Handle("/", http.HandlerFunc(handler))

	s := &http.Server{
        Addr            : ":7800",
        ReadTimeout     : 10 * time.Second,
        WriteTimeout    : 60 * 3 * time.Second,
    }

	fmt.Println("Listening on port: 7800")
	s.ListenAndServe()
}

func Listener(w http.ResponseWriter, r *http.Request) {
		
	channel := r.URL.Query()["channel"][0]
	fmt.Println("new connection", "GET params were:", channel)
	c := kafkaListener(channel)
	
	conn, _ := sse.Upgrade(w, r)

	// write a plain string
	conn.WriteString("Connected")

	for {
		msg, err := c.ReadMessage(-1)
		if err == nil {
			var bo interface{} 
			mErr := json.Unmarshal(msg.Value, &bo)
			if mErr != nil {
				fmt.Println(mErr)
			}
			conn.WriteJson(bo)
			fmt.Println("Log:", bo)
		} else {
			// The client will automatically try to recover from all errors.
			fmt.Printf("Consumer error: %v (%v)\n", err, msg)
		}
	}
	c.Close()

}

func kafkaListener(topics string) *kafka.Consumer {
	
	// topics = "testTopic"

	c, err := kafka.NewConsumer(&kafka.ConfigMap{
		"bootstrap.servers": "localhost:9092",
		"group.id":          "testGroup",
		"auto.offset.reset": "latest",
		"max.poll.interval.ms": "11991919",
	})

	if err != nil {
		panic(err)
	}

	c.SubscribeTopics([]string{topics}, nil)
	
	fmt.Println("listening on topic: ", topics)
	
	return c
}

func handler(w http.ResponseWriter, r *http.Request) {

	if r.URL.Path != "/" {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	// Read in the template with our SSE JavaScript code.
	t, err := template.ParseFiles("templates/index.html")
	if err != nil {
		fmt.Println("WTF dude, error parsing your template.")

	}

	// Render the template, writing to `w`.
	t.Execute(w, "friend")

	// Done.
	fmt.Println("Finished HTTP request at", r.URL.Path)
}