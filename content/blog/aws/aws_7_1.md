---
title: '7-1) Amazon ElastiCache'
date: 2025-03-29 19:28:00
category: 'aws'
draft: false
---

## 7-1-1) Amazon ElastiCache

- RDS가 관계형 데이터베이스를 관리하는 것과 같은 방법으로, **ElastiCache는 Redis OSS나 Memcached / Valkey (Redis OSS 기반 성능개선형)** 를 관리한다.
- 캐시는 인메모리 데이터베이스로 높은 성능과 낮은 지연을 제공한다.
- 읽기가 자주 발생하는 작업에서 데이터베이스 부하를 줄이는데 도움이 된다.
- 혹은, 애플리케이션의 **stateless 정보를 저장하는데 도움**을 준다.
- AWS는 OS 유지보수 / 패치, 최적화, 세팅, 설정, 모니터링, 실패 복구, 백업을 관리한다.
- ElastiCache를 사용하는 것은 많은 코드 상의 변화를 야기한다.


| 캐시 종류 | Redis OSS (Open Source)                                                                                                                                               | Memcached                                                                                                  |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 특징    | **- 다중 AZ에서 자동 Failover 지원**<br>- **읽기 레플리카**를 통한 읽기 작업의 스케일링 및 고가용성 지원<br>**- AOF(Append Only File) 지원을 사용한 데이터 내구성**<br>- 백업과 복구 기능<br>- **Set와** **Sorted Set** 지원 | **- 파티셔닝된 멀티 노드 (샤딩)**<br>- 고가용성 미지원 (replication)<br>- 영속성 없음<br>- 백업과 복구 기능 (서버리스일때만)<br>- **멀티 쓰레드** 구조 |
|       |                                                                                                                                                                       |                                                                                                            |

<div align="left">
  <img src="./images/elasticache.png" width="500px" />
</div>
</br>

## 7-1-2) ElastiCache - Cache Security

- ElastiCache는 **Redis IAM 인증 사용을 지원**한다.
- ElastiCache의 IAM 정책들은 AWS API 레벨 보안에서만 사용할 수 있다.
- **Redis AUTH**
	- **Redis 클러스터 생성 시 password/token을 설정할 수 있다.**
	- 보안 그룹에 추가하여 캐시에 추가적인 보안을 제공한다.
	- **SSL 데이터 전송 보안**도 제공한다.
- **Memcached**
	- **SASL 기반의 보안을 제공**한다.

</br>

## 7-1-3) ElastiCache의 패턴

- Lazy Loading: 모든 읽기 데이터가 캐시되고 데이터가 캐시에서 정체된다.
- Write Through: 데이터가 DB에 적재될 때마다 캐시에 추가되거나 업데이트 됨. (정체된 데이터 없음)
- Session Store: TTL 기능을 사용하여 캐시에 임시 세션 데이터 생성

</br>

## 7-1-4) ElastiCache 사용 사례

- 게이밍 리더보드는 구현하기 어렵다.
- 레디스 Sorted Sets는 각각의 특수성과 순서를 보장한다.
- 새로운 요소가 추가될 때마다, 실시간으로 순위가 매겨지고 순서가 정해진다.
