module.exports = {
  "metadata.broker.list": process.env.KAFKA_BROKER_LIST || "docker:9092",
  "dr_cb": true
}