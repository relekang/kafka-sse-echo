# kafka-sse-echo

Sending new data on kafka topics over sse to everyone that wants to listen.

# Run

### With given port

```shell
docker run -eTOPICS=foo,bar -p3000:3000 --name kafka-sse-echo relekang/kafka-sse-echo
curl localhost:3000
```

### With random port

```shell
docker run -eTOPICS=foo,bar -P --name kafka-sse-echo relekang/kafka-sse-echo
# find the port in docker ps to curl the endpoint
curl $(docker ps --filter 'name=kafka-sse-echo' --format '{{.Ports}}' | sed 's/->[0-9]*\/tcp//')
```

## Options

* `TOPICS` - Comma separated list of topics to subscribe to.
* `KAFKA_URL` - Kafka connection string can be one `host:port` or comma separated list of
  `host:port`
* `ENABLE_PING_EVENTS` - will send a ping event every 10 second over sse.
