---
title: '8-3) 스트림즈DSL 중요 옵션(필수 옵션)'
date: 2025-01-27 12:23:22
category: 'kafka'
draft: false
---

## 8-3-1) 필수 옵션

- `bootstrap-servers`: 프로듀서가 데이터를 전송할 대상 카프카 클러스터에 속한 브로커의 호스트 이름 : 포트를 1개 이상 작성한다.
- `application.id`: 스트림즈 애플리케이션을 구분하기 위한 고유한 아이디를 설정한다. 다른 로직을 가진 스트림즈 애플리케이션들은 모두 다른 ID를 가져야 한다.

</br>

## 8-3-2) 선택 옵션

- `default.key.serde`: 레코드의 메시지 키를 직렬화, 역직렬화하는 클래스를 지정한다. 기본 값은 바이트 직렬화, 역직렬화 클래스인 Serdes.ByteArray().getClass().getName() 이다. 직렬화/역직렬화에 사용할 클래스를 다르게 지정할 수 있다.
- `default.value.serde`: 레코드의 메시지 값을 직렬화, 역직렬화하는 클래스를 지정한다. 기본 값은 바이트 직렬화, 역직렬화 클래스인 Serdes.ByteArray().getClass().getName() 이다. 직렬화/역직렬화에 사용할 클래스를 다르게 지정할 수 있다.
- `num.stream.threads`: 스트림 프로세싱 실행 시 실행될 스레드 개수를 지정한다. 기본값은 1이다.
- `state.dir`: 상태기반 데이터 처리 시 데이터를 저장할 디렉토리를 지정한다. 기본 값은 /tmp/kafka-stream이다. 