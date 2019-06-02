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

const sendRecord = (logs) => {

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
// let logs = {
//     count: 0,
//     publish_time: Date.now(),
//     loadMe: {
//         "just": "to",
//         "load": "test",
//         "i": "am", 
//         "added": ",",
//         "i": "dont't",
//         "make": "any",
//         "sence": "."
//     }
// }

let logs = [
    {
      "_id": "5cf40572007c8af86f59903a",
      "index": 0,
      "guid": "86930d12-75e1-4595-9a5e-0e6e5b5af5ba",
      "isActive": true,
      "balance": "$2,091.03",
      "picture": "http://placehold.it/32x32",
      "age": 22,
      "eyeColor": "blue",
      "name": "Caldwell Key",
      "gender": "male",
      "company": "SONIQUE",
      "email": "caldwellkey@sonique.com",
      "phone": "+1 (848) 549-3099",
      "address": "719 Stewart Street, Beaverdale, Washington, 546",
      "about": "Culpa ut irure irure excepteur. Sunt anim ipsum Lorem sit reprehenderit nostrud consequat quis cupidatat ea sunt mollit esse. Sunt qui eu enim cupidatat dolor consequat aliqua pariatur fugiat nisi ut. Minim magna eu id id sint cupidatat. Aute est officia duis magna est exercitation culpa. Sit eiusmod id exercitation irure proident veniam aute tempor.\r\n",
      "registered": "2017-11-14T03:24:04 -06:-30",
      "latitude": 28.84072,
      "longitude": 126.880665,
      "tags": [
        "culpa",
        "aliquip",
        "sunt",
        "excepteur",
        "elit",
        "magna",
        "enim"
      ],
      "friends": [
        {
          "id": 0,
          "name": "Barbra Espinoza"
        },
        {
          "id": 1,
          "name": "Chelsea Mcgee"
        },
        {
          "id": 2,
          "name": "Steele Flores"
        }
      ],
      "greeting": "Hello, Caldwell Key! You have 10 unread messages.",
      "favoriteFruit": "apple"
    },
    {
      "_id": "5cf4057274e6d2554711706e",
      "index": 1,
      "guid": "9e3da59d-3d86-4654-8ed0-27d1493d8388",
      "isActive": false,
      "balance": "$2,794.96",
      "picture": "http://placehold.it/32x32",
      "age": 33,
      "eyeColor": "brown",
      "name": "Kim Wagner",
      "gender": "male",
      "company": "QUILTIGEN",
      "email": "kimwagner@quiltigen.com",
      "phone": "+1 (886) 447-3787",
      "address": "874 Chase Court, Dola, Alabama, 3632",
      "about": "Deserunt esse commodo sunt nisi elit exercitation commodo. Reprehenderit consectetur laboris eiusmod cillum aliqua officia eu et voluptate non exercitation. Eu ex ut dolore occaecat reprehenderit incididunt pariatur culpa in. Elit officia non ad est anim laborum nulla nisi irure et dolor. Pariatur incididunt dolor velit ipsum reprehenderit aliquip dolor excepteur consectetur ipsum labore voluptate. Officia laborum enim proident magna laboris mollit consequat deserunt deserunt cillum dolore Lorem.\r\n",
      "registered": "2017-10-05T05:42:55 -06:-30",
      "latitude": -13.312335,
      "longitude": 148.220038,
      "tags": [
        "consequat",
        "enim",
        "commodo",
        "sunt",
        "ullamco",
        "non",
        "est"
      ],
      "friends": [
        {
          "id": 0,
          "name": "Rowland Hicks"
        },
        {
          "id": 1,
          "name": "Erica Oconnor"
        },
        {
          "id": 2,
          "name": "Buck Logan"
        }
      ],
      "greeting": "Hello, Kim Wagner! You have 6 unread messages.",
      "favoriteFruit": "strawberry"
    },
    {
      "_id": "5cf40572f4f5066134a92755",
      "index": 2,
      "guid": "bac2676d-2570-4aa4-940b-6677b79f60c6",
      "isActive": false,
      "balance": "$3,255.19",
      "picture": "http://placehold.it/32x32",
      "age": 21,
      "eyeColor": "brown",
      "name": "Parks Kline",
      "gender": "male",
      "company": "MICRONAUT",
      "email": "parkskline@micronaut.com",
      "phone": "+1 (943) 530-2388",
      "address": "821 Cumberland Walk, Coyote, Ohio, 4359",
      "about": "Pariatur veniam aute nisi mollit. Culpa tempor commodo id culpa. Laboris officia nulla consectetur esse proident nisi nulla ullamco adipisicing. Proident elit aliquip in consectetur nulla anim magna. Aliquip ex id officia consectetur. Ea ipsum anim amet eu non ex duis minim non tempor.\r\n",
      "registered": "2015-12-19T06:54:55 -06:-30",
      "latitude": -78.255924,
      "longitude": 159.727644,
      "tags": [
        "excepteur",
        "ex",
        "ullamco",
        "amet",
        "nisi",
        "cupidatat",
        "commodo"
      ],
      "friends": [
        {
          "id": 0,
          "name": "Rosella Mcneil"
        },
        {
          "id": 1,
          "name": "Fern Sherman"
        },
        {
          "id": 2,
          "name": "Navarro Brewer"
        }
      ],
      "greeting": "Hello, Parks Kline! You have 4 unread messages.",
      "favoriteFruit": "apple"
    },
    {
      "_id": "5cf405726adf968b0136c3d0",
      "index": 3,
      "guid": "5993921f-434d-43d4-a76e-61595cfd9af0",
      "isActive": true,
      "balance": "$1,214.86",
      "picture": "http://placehold.it/32x32",
      "age": 27,
      "eyeColor": "brown",
      "name": "Jewel Whitley",
      "gender": "female",
      "company": "QUONATA",
      "email": "jewelwhitley@quonata.com",
      "phone": "+1 (971) 514-3249",
      "address": "138 Crooke Avenue, Sharon, Virgin Islands, 3444",
      "about": "Aliquip nulla est commodo culpa ea Lorem exercitation cupidatat. Laboris ipsum laborum quis ullamco qui incididunt non aute minim mollit. Sit duis cupidatat cupidatat duis exercitation duis deserunt sint elit nisi consectetur veniam. Ea laborum exercitation duis labore excepteur commodo id proident non nostrud incididunt incididunt.\r\n",
      "registered": "2017-11-25T03:35:35 -06:-30",
      "latitude": -69.198137,
      "longitude": -128.470453,
      "tags": [
        "deserunt",
        "tempor",
        "deserunt",
        "cillum",
        "proident",
        "adipisicing",
        "id"
      ],
      "friends": [
        {
          "id": 0,
          "name": "Phillips Johnston"
        },
        {
          "id": 1,
          "name": "Socorro Watkins"
        },
        {
          "id": 2,
          "name": "Powell Nash"
        }
      ],
      "greeting": "Hello, Jewel Whitley! You have 4 unread messages.",
      "favoriteFruit": "apple"
    },
    {
      "_id": "5cf40572e15afa7ea6f64bdc",
      "index": 4,
      "guid": "2ccd8cbc-6bfd-48e1-82aa-e07f2cea5263",
      "isActive": true,
      "balance": "$3,439.40",
      "picture": "http://placehold.it/32x32",
      "age": 37,
      "eyeColor": "green",
      "name": "Hutchinson Moore",
      "gender": "male",
      "company": "BIOTICA",
      "email": "hutchinsonmoore@biotica.com",
      "phone": "+1 (870) 563-2850",
      "address": "669 Luquer Street, Wedgewood, Louisiana, 2759",
      "about": "Consequat consectetur irure ex deserunt. Nisi incididunt ea mollit ut excepteur tempor exercitation. Occaecat nostrud fugiat dolor nostrud. Deserunt eu laboris amet velit reprehenderit velit cupidatat id ut nostrud non minim consequat amet. Est veniam elit ullamco sit dolor nostrud pariatur enim.\r\n",
      "registered": "2017-08-15T08:06:25 -06:-30",
      "latitude": 78.920525,
      "longitude": 114.372506,
      "tags": [
        "commodo",
        "exercitation",
        "nisi",
        "eiusmod",
        "commodo",
        "veniam",
        "tempor"
      ],
      "friends": [
        {
          "id": 0,
          "name": "Rosario Mccarthy"
        },
        {
          "id": 1,
          "name": "David Shepherd"
        },
        {
          "id": 2,
          "name": "Whitaker Dotson"
        }
      ],
      "greeting": "Hello, Hutchinson Moore! You have 9 unread messages.",
      "favoriteFruit": "apple"
    }
  ]
const sendBulk = () => {
    for (let i = 0; i < logs_count; i++) {
        logs.count = i;
        logs.publish_time = Date.now();
        sendRecord(logs)
    }
}