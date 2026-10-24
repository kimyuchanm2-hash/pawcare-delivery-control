# PawCare 로보독 배송 관제

PawCare는 AI 동행 프로젝트의 일부로, 로보독을 활용해 어르신의 생활을 돕는 방법을 탐구하는 프로젝트입니다. 이 저장소에는 배송 경로 설정과 로보독 운행, 재난 신호 관제 코드가 있습니다.

## 성공했던 최종 연동 코드 3개

| 코드 | 역할 |
| --- | --- |
| [로보독 배송·관제 Python 코드](robodog_abc_delivery.py) | 배송 이동, 인물·QR 확인, 재난 정지와 관제 명령 처리 |
| [PC 수신 micro:bit MakeCode 코드](microbit_pc_receiver_makecode.ts) | 그룹 1 라디오 신호를 받아 `RX:E1` 형식으로 USB 시리얼 전달 |
| [관측소 송신 micro:bit MakeCode 코드](microbit_disaster_station_sender_makecode.ts) | 관측소 센서값을 표시·기록하고 E/F/G/H 재난 신호를 그룹 1로 송신 |

MakeCode 파일은 JavaScript/TypeScript 코드입니다. MakeCode의 JavaScript 탭에 붙여 넣어 사용하세요.

## 연결 기준

- 관측소 송신 micro:bit → 라디오 그룹 1 → PC USB 수신 micro:bit
- PC 수신 micro:bit → **COM10**, 115200 baud → Python
- RoboDog → **COM8** → Python
- 재난 코드 앞 글자: E 지진, F 화재, G 가스 유출, H 무더위
- 위치 번호 1은 A·B, 2는 B·C에 적용됩니다.

Python이 관제 HTML 서버를 실행합니다. GitHub Pages는 화면을 보여주는 정적 페이지이므로 PC의 COM 포트와 로봇을 직접 제어하지 않습니다.

## 확인 범위

위 3개 파일은 사용자가 이전에 성공했던 로보독 구성의 코드 버전입니다. 코드가 저장소에 올라간 것과 현재 연결 환경에서 실제 로봇 주행·센서 동작이 확인된 것은 별개이므로, 포트가 COM10/COM8인지 확인하고 기기에서 시험하세요.
