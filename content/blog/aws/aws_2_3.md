---
title: '2-3) Security Groups'
date: 2025-02-24 22:40:40
category: 'aws'
draft: false
---

- **네트워크 및 보안 > 보안 그룹**
- Security Group은 AWS의 네트워크 보안의 근간이다.
- EC2 인스턴스의 인바운드/아웃바운드되는 트래픽을 제어한다.
- Security Group은 화이트리스트 방식으로, **허용되는 정책만 적용 가능하다**. 즉, EC2 인스턴스의 방화벽 역할을 한다.
- Security Group은 Stateful한 방식으로, 요청의 응답에 대해서는 요청과 동일한 정책이 적용된다.
	- 포트에 대한 접근 제어 (프로토콜 제어 포함)
	- IPv4, IPv6 방식 Ip들의 범위 제어 (CIDR)
	- 인바운드, 아웃바운드 제어
- **Security Group의 규칙은 IP 혹은 Security Group을 참조**할 수 있다.

</br>

## 2-3-1) Security Group의 특징

- 여러 인스턴스에 적용될 수 있다.
- **특정 지역(Region)과 VPC 조합에만 제한**된다.
- Security Group은 EC2 인스턴스 외부에 존재하므로, 접근이 차단되었을 때는 외부에서 발생한 트래픽이 보이지 않게 된다.
- SSH 접근을 위해 하나의 별도 Security Group을 유지하는 것이 좋다.
- 애플리케이션이 타임아웃되면, 이는 Security Group 문제라고 볼 수 있다.
- 기본적으로 모든 인바운드 트래픽은 차단되고, 모든 아웃바운드 트래픽은 허용된다.

> - 22 = SSH (Secure Shell) - log into a Linux instance
> - 21 = FTP (File Transfer Protocol) – upload files into a file share
> - 22 = SFTP (Secure File Transfer Protocol) – upload files using SSH
> - 80 = HTTP – access unsecured websites
> - 443 = HTTPS – access secured websites
> - 3389 = RDP (Remote Desktop Protocol) – log into a Windows instance

</br>

## 2-3-2) SSH 접속 시

```sh
chmod 0400 EC2_Tutorial.pem
ssh -i EC2_Tutorial.pem ec2-user@34.205.143.10
```
