---
title: '1-4) AWS Access Key, CLI, SDK'
date: 2025-02-09 15:09:38
category: 'aws'
draft: false
---

- AWS에 접속하기 위해서는 세 가지 옵션이 존재한다.
	- AWS Management Console (패스워드 + MFA)
	- AWS Command Line Interface (CLI): 로컬 컴퓨터의 콘솔에서 사용하는 명령어 기반의 CLI (Access Key에 의해 보호됨)
	- AWS Software Developer Key (SDK): 애플리케이션 코드에서 API를 호출하기 위해 사용됨 (Access Key에 의해 보호됨)

</br>

## 1-3-1) Access Key (사용자 - 사용자 상세 - 보안 자격 증명)

- Access Key는 AWS Console을 통해 발급할 수 있으며, 유저들이 콘솔 명령어 혹은 SDK API를 호출하기 위해서 사용되는 키 값이다. 즉, 패스워드와 유사한 역할을 하기 때문에 공유되어서는 안된다.
- AccessKey ID = ID
- Secret Access Key = Password

</br>

## 1-3-2) AWS CLI

- 커맨드 라인에서 AWS 서비스와 상호작용할 수 있게 해주는 도구로, public API들을 사용하여 AWS 서비스들에 직접적으로 접근할 수 있다.
- 자원들을 관리하기 위해 스크립트를 작성할 수 있다.
- AWS 관리 콘솔을 대체할 수 있고 오픈소스로 공개되어 있다.

</br>

## 1-3-3) AWS SDK(AWS Software Development Kit)

- 각 언어마다 존재하며 다음과 같은 기능들을 제공한다.
- 프로그래밍을 통해 애플리케이션에서 AWS 서비스들을 접근하고 관리할 수 있다.
