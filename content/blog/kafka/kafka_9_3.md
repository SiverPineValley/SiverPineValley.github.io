---
title: '9-3) 단일 모드 커넥트 (Single Mode Kafka Connect)'
date: 2025-01-28 23:51:32
category: 'kafka'
draft: false
---

## 9-3-1) 단일 모드 커넥트 설정

- 단일 모드 커넥트를 실행하기 위해서는 단일 모드 커넥트를 참조하는 파일인 `connect-standalone.properties` 파일을 수정해야 한다.

</br>

```properties
bootstrap.servers=my-kafka:19092

# Serializer, 컨버터 정보
key.converter=org.apache.kafka.connect.json.JsonConverter
value.converter=org.apache.kafka.connect.json.JsonConverter
key.converter.schemas.enable=false
value.converter.schemas.enable=false

# 단일 모드 커넥트에서는 파일로 offset 정보를 저장
offset.storage.file.filename=/tmp/connect.offsets
offset.flush.interval.ms=10000

# 플러그인 디렉터리 정보
plugin.path=/usr/local/share/java,/usr/local/share/kafka/plugins
```

</br>

- 단일 모드 커넥트로 실행 시 파라미터로 커넥트 설정파일과 커넥터 설정파일을 차례로 넣어 실행하면 된다.
- 다음은 커넥터의 설정 파일(connect-file-source.properties)이다.

</br>

```properties
# 커넥터의 이름
name=local-file-source

# 커넥터의 클래스
connector.class=FileStreamSource

# 커넥터의 개수
tasks.max=1
file=/tmp/test.txt
topic=connect-test
```

</br>

```sh
$ bin/connect-standalone.sh config/connect-standalone.properties config/connect-file-source.properties
```
