const SseChannel = require('sse-channel');
const kafka = require('kafka-node');

const sse = new SseChannel({ cors: { origins: ['*'] } });

const kafkaHost = process.env.KAFKA_URL || 'localhost:9092';
const topics = (process.env.TOPICS || '').split(',').map(topic => ({ topic }));
const client = new kafka.KafkaClient({ kafkaHost });

console.log(`Echoing ${process.env.TOPICS} from ${kafkaHost}`);

const consumer = new kafka.Consumer(client, topics, {
  autoCommit: false,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024
});

consumer.on('message', function onMessage(message) {
  sse.send({
    event: 'message',
    data: JSON.stringify(message)
  });
});

consumer.on('error', function onError(error) {
  sse.send({
    event: 'error',
    data: ''
  });
  console.error(error);
  console.error(error.stack);
});

consumer.on('offsetOutOfRange', function(topic) {
  console.log(offsetOutOfRange);
});

if (process.env.ENABLE_PING_EVENTS) {
  setInterval(() => {
    sse.send({
      event: 'ping',
      data: JSON.stringify({ timestamp: new Date().toISOString() })
    });
  }, 10000);
}

module.exports = function handler(req, res) {
  sse.addClient(req, res);
};
