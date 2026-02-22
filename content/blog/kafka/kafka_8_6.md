---
title: '8-6) 스트림즈 DSL - Queryable store'
date: 2025-01-27 15:15:29
category: 'kafka'
draft: false
---

- 카프카 스트림즈에서 KTable은 카프카 토픽의 데이터를 로컬의 rocksDB에 Materialized View로 만들어 두고 사용하기 때문에 레코드의 메시지 키, 메시지 값을 기반으로 KeyValueStore로 사용할 수 있다. 특정 토픽을 KTable로 사용하고 ReadOnlyKeyValueStore로 뷰를 가져오면 메시지 키를 기반으로 토픽 데이터를 조회할 수 있게 된다.

</br>

```java
package com.example;  
  
import org.apache.kafka.common.serialization.Serdes;  
import org.apache.kafka.streams.KafkaStreams;  
import org.apache.kafka.streams.StoreQueryParameters;  
import org.apache.kafka.streams.StreamsBuilder;  
import org.apache.kafka.streams.StreamsConfig;  
import org.apache.kafka.streams.kstream.KTable;  
import org.apache.kafka.streams.kstream.Materialized;  
import org.apache.kafka.streams.state.KeyValueIterator;  
import org.apache.kafka.streams.state.QueryableStoreTypes;  
import org.apache.kafka.streams.state.ReadOnlyKeyValueStore;  
import org.slf4j.Logger;  
import org.slf4j.LoggerFactory;  
  
import java.util.Properties;  
import java.util.Timer;  
import java.util.TimerTask;  
  
public class QueryableStore {  
    private final static Logger log = LoggerFactory.getLogger(QueryableStore.class);  
  
    private static String APPLICATION_NAME = "global-table-query-store-application";  
    private static String BOOTSTRAP_SERVERS = "my-kafka:19092";  
    private static String ADDRESS_TABLE = "address";  
    private static boolean initialize = false;  
    private static ReadOnlyKeyValueStore<String, String> keyValueStore;  
  
    public static void main(String[] args) {  
  
        Properties props = new Properties();  
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, APPLICATION_NAME);  
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVERS);  
        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());  
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());  
  
        StreamsBuilder builder = new StreamsBuilder();  
        KTable<String, String> addressTable = builder.table(ADDRESS_TABLE, Materialized.as(ADDRESS_TABLE));  
        KafkaStreams streams;  
        streams = new KafkaStreams(builder.build(), props);  
        streams.start();  
  
        TimerTask task = new TimerTask() {  
            public void run() {  
                if (!initialize) {  
                    keyValueStore = streams.store(StoreQueryParameters.fromNameAndType(ADDRESS_TABLE,  
                            QueryableStoreTypes.keyValueStore()));  
                    initialize = true;  
                }  
                printKeyValueStoreData();  
            }  
        };  
        Timer timer = new Timer("Timer");  
        long delay = 10000L;  
        long interval = 1000L;  
        timer.schedule(task, delay, interval);  
    }  
  
    static void printKeyValueStoreData() {  
        log.info("========================");  
        KeyValueIterator<String, String> address = keyValueStore.all();  
        address.forEachRemaining(keyValue -> log.info(keyValue.toString()));  
    }  
}
```
</br>

- `table()`: 파라미터로 들어온 테이블에 대한 Materialized View화 된 KTable로 가져올 수 있는 메소드.
- `store()`: 스토어를 정의 (Key / Value 스토어로 지정해야 함)
-  `all()`: Key/Value 스토어에서 모든 데이터를 가져옴.
