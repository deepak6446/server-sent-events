import json
import os

count = 0
diff = 0

for i in os.listdir("/home/dpoo@eur.ad.sag/Downloads/"):
    if "dump" in i and "json" in i :
        print("/home/dpoo@eur.ad.sag/Downloads/" + i)
        with open("/home/dpoo@eur.ad.sag/Downloads/" + i, "r") as outfile:
            jsonData = json.load(outfile)
            count = count + len(jsonData)
            for j in jsonData:
                diff = diff + j["recieved_time"] - j["publish_time"]

print("Total Messages Received: ", count)
print("Average delay in messages starting from producer before kafka: ", (diff/count)/1000, "sec") 