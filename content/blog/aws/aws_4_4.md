---
title: '4-4) EC2 Instance Store'
date: 2025-03-05 16:32:18
category: 'aws'
draft: false
---

- EBS 볼륨들은 좋긴 하지만 제한적인 성능을 가진 네트워크 드라이브이다. (인스턴스 로컬 드라이버)
- **만약 고성능 하드웨어 디스크를 원한다면, 대신 `EC2 Instance Store`를 사용하는 것이 낫다.**
- I/O 성능(IOPS)가 훨씬 좋다.
- `EC2 Instance Store`는 **인스턴스가 중단되면 스토리지를 손실**하게 된다 (일시적이다)
- 사용 사례로는 buffer / cache / scratch data / 임시 컨텐츠의 용도로 사용하는 것이 일반적이다.
- 하드웨어 장애 시 데이터 손실의 위험이 있으므로, 주기적인 백업이나 레플리케이션 하는 것이 추천된다.
