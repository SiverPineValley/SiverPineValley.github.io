---
title: '9-0) Instanting Applications Quickly'
date: 2025-04-13 14:34:00
category: 'aws'
draft: false
---

- EC2 Instance
	- **Golden AMI**: 사전에 애플리케이션, OS 종속성 등을 설치 및 EC2 인스턴스의 시작을 Golden AMI로부터 가져오기
	- **Bootstrap using User Data**: User Data Script를 사용하여 부트스트랩 시 설정
	- Hybrid: Golden AMI와 User Data 를 모두 사용 (Elastic Beanstalk)
- RDS Database
	- 데이터베이스가 스키마와 사전 데이터를 갖춘 상태로 스냅샷으로부터 복구
- EBS Volumes
	- 사전 디스크 포맷과 데이터를 갖춘 상태로 스냅샷으로 부터 복구
