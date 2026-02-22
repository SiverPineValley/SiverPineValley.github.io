---
title: '9-7) 분산 모드 카프카 커넥트 실습'
date: 2025-01-29 20:48:12
category: 'kafka'
draft: false
---

## 9-7-1) 분산 모드 카프카 커넥트 설정

```sh
$ cat config/connect-distributed.properties
bootstrap.servers=my-kafka:19092
group.id=connect-cluster

# Serializer, 컨버터 정보
key.converter=org.apache.kafka.connect.json.JsonConverter
value.converter=org.apache.kafka.connect.json.JsonConverter
key.converter.schemas.enable=false
value.converter.schemas.enable=false

# 분산 모드 커넥트에서는 offset, config, status를 담는 토픽이 필요
# 다른 그룹 별로 다른 토픽으로 설정해야 한다
offset.storage.topic=connect-offsets
offset.storage.replication.factor=1
config.storage.topic=connect-configs
config.storage.replications.factor=1
status.storage.topic=connect-status
status.storage.replication.factor=1

offset.flush.interver.ms=10000

# 플러그인 디렉터리 정보
plugin.path=/usr/local/share/java,/usr/local/share/kafka/plugins
```
</br>

## 9-7-2) 분산 모드 카프카 커넥트 실행, 플러그인 확인

```sh
$ bin/connect-distributed.sh config/connect-distributed.properties
...

$ curl -X GET http://localhost:8083/connector-plugins
[
	{
		"class": "org.apache.kafka.connect.file.FileStreamSinkConnector",
		"type": "sink",
		"version": "3.9.0"
	}
]
```
</br>

## 9-7-3) FileStreamSinkConnector 테스트

```sh
$ curl -X POST http://localhost:8083/connectors \
-H 'Content-Type: application/json' \
-d '{
	"name": "file-sink-test",
	"config": {
		"topics": "test",
		"connector.class": "org.apache.kafka.connect.file.FileStreamSinkConnector",
		"tasks.max": 1,
		"file": "/tmp/connect-test.txt"
	}
}'
```
</br>

## 9-7-4) FileStreamSinkConnector 실행 확인

- 커넥터의 위치, 실행 위치, 커넥터의 종류 (source, sink)를 확인할 수 있다.
</br>

```sh
$ curl http://localhost:8083/connectors/file-sink-test/status
{
	...
}
``` 
</br>

## 9-7-5) FileStreamSinkConnector 종료

```sh
$ curl http://localhost:8083/connectors
["file-sink-test"]

$ curl -X DELETE http://localhost:8083/connectors/file-sink-test

$ curl http://localhost:8083/connectors
```