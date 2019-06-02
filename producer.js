const events_1 = require("events");
try {
    process.setMaxListeners(0);
    events_1.EventEmitter.defaultMaxListeners = Infinity;
}
catch (e) {
    console.log('error:', e)
}

var kafka = require("kafka-node")

const client = new kafka.Client("localhost:2181", "my-client-id", {
    sessionTimeout: 600,
    spinDelay: 100,
    retries: 2
});

const producer = new kafka.HighLevelProducer(client);

producer.on("ready", () => {
    console.log("Kafka Producer is connected and ready.");
    sendBulk();
});

producer.on("error", (error) => {
    console.error('error in connection : ', error);
});
let i = 200

const sendRecord = (logs) => {

    // const buffer = new Buffer.from(JSON.stringify(logs));
    // Create a new payload
    const record = [
        {
            topic: "testTopic",   //which topic to send record
            messages: JSON.stringify(logs)
        }
    ];

    //Send record to Kafka 
    producer.send(record, (error) => {
        console.log(`data send count: ${logs.count}`);
    });

    producer.on('error', (err) => {
        console.log(`error in producer ${err}`);
    })
}

let logs_count = 300
let logs = {
    count: 0,
    publish_time: Date.now(),
    loadMe: {
        "just": "to",
        "load": "test",
        "i": "am", 
        "added": ",",
        "i": "dont't",
        "make": "any",
        "sence": "."
    }
}
const sendBulk = () => {
    for (let i = 0; i < logs_count; i++) {
        logs.count = i;
        logs.publish_time = Date.now();
        sendRecord(logs)
    }
}