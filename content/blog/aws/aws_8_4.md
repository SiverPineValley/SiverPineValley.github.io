---
title: '8-4) 타사 도메인 및 Route 53'
date: 2025-04-01 14:08:00
category: 'aws'
draft: false
---

- Domain Registra (e.g. GoDaddy, Amazon Registrar 등등)는 보통 DNS 레코드를 관리하기 위한 DNS 서비스들을 제공한다.
- 즉, 도메인을 AWS 네이티브가 아닌 GoDaddy등에서 구매 후 Route53을 사용하여 DNS 레코드를 관리하는 것도 가능하다.
- Route53에서 Public Hosted Zone을 생성한다.
- **서드 파티 웹사이트에서 NS 레코드를 Route 53 네임 서버들을 사용하도록 수정**한다.
- Domain Registar가 DNS 서비스 자체와 동일한 것은 아니다. 하지만 모든 도메인 레지스트라는 몇몇 DNS 기능들을 함께 제공한다.
