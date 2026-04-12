---
title: '6-4) RDS & Aurora Security'
date: 2025-03-29 15:21:00
category: 'aws'
draft: false
---

- 데이터 저장 측면(**At-rest**)의 보안
	- 데이터베이스 마스터 & 레클리카 암호화는 **AWS KMS**를 사용한다. (최초 시작 시 정의되어야 한다.)
	- 만약 마스터가 암호화되어 있지 않으면, 읽기 레플리카는 암호화될 수 없다.
	- 암호화되있지 않은 데이터베이스를 암호화하기 위해서는 **DB 스냅샷을 생성 후 이를 암호화된 형태로 복구**해야 한다.
- 데이터 전송 측면(**In-flight**)의 보안
	- TLS가 기본적으로 설정되며, 클라이언트 측에서 AWS TLS 루트 인증서를 사용한다.
- IAM Authentication: 데이터베이스 연결 시 IAM 역할을 이용한다.
- Security Groups: RDS / Aurora DB의 네트워크 접근을 통제한다.
- No SSH 이용 가능: RDS 사용자 정의 제외하고 가능 (RDS 사용자 정의에서는 SSH 사용 가능)
- 감사 로그(Audit Log)는 장기간 보유를 위해 활성화되고 CloudWatch Log로 전송될 수 있다.
