# PawCare 로보독 배송 관제

PawCare는 AI 동행 프로젝트의 일부로, 로보독을 활용해 어르신의 생활을 돕는 방법을 탐구하는 프로젝트입니다. 이 저장소는 그중 **배송 경로 설정, 로보독 운행, 재난 관제 연결**에 필요한 코드를 모았습니다.

## 최신 연동 코드 3개

현재 연결 기준은 **관측소 송신 micro:bit는 PC의 COM17**, **수신 micro:bit는 RoboDog에 장착**, **RoboDog 제어 포트는 COM8**입니다. 두 micro:bit는 라디오 그룹 1을 사용합니다.

| 코드 | 역할 |
| --- | --- |
| [RoboDog 배송·관제 Python 코드](robodog_abc_delivery.py) | 배송 이동, 인물·QR 확인, COM17 센서 데이터 수신, 재난 정지와 관제 명령 처리 |
| [RoboDog 장착 micro:bit 수신 코드](microbit_robodog_radio_receiver_makecode.ts) | 그룹 1 신호를 받아 보드 LED에 E/F/G/H 및 위치 표시 |
| [관측소 센서 송신 micro:bit 코드](microbit_disaster_station_sender_makecode.ts) | 센서값을 COM17으로 보내고 재난 신호를 라디오 그룹 1로 방송 |

MakeCode 파일은 JavaScript/TypeScript 코드입니다. MakeCode의 JavaScript 탭에 붙여 넣어 사용하세요. PC 수신용 라디오 게이트웨이 예시는 [이전 수신 코드](microbit_pc_receiver_makecode.ts)에 보관했습니다. 지금 연결 구성에서는 PC 게이트웨이를 사용하지 않습니다.

## 프로젝트에서 만든 것

처음에는 Scratch에서 배송지를 순서대로 방문하는 흐름을 구상했습니다. 이후 사용자가 지도에 점을 찍어 A·B·C 배송지를 정하고, Python 제어 프로그램과 HTML 관제 화면에서 운행 상태를 확인하도록 확장했습니다.

배송지에서는 로보독 카메라로 인물 카드와 QR 코드의 `GO` 문자를 확인합니다. 센서 송신 micro:bit는 `OBS,1,...` 값을 COM17로 Python에 전달하고, 재난 신호를 라디오로 로보독 장착 micro:bit에도 보냅니다. Python 관제는 위험 신호에 따라 로보독을 멈추고 HTML에 상황을 표시합니다.

## 실행과 포트

- 관측소 센서 micro:bit → PC USB **COM17**, 115200 baud
- RoboDog → PC USB **COM8**
- RoboDog 장착 micro:bit → RoboDog에서 전원 공급, PC COM 포트로 연결하지 않음
- 관측소·로보독 micro:bit 라디오 그룹 → **1**

GitHub Pages는 소개 페이지와 관제 화면 미리보기를 보여줍니다. 실제 로보독 이동과 PC COM 통신은 Python 프로그램 및 장치 연결이 필요합니다. 코드가 저장소에 올라간 것과 현재 장비에서 실제 주행·센서가 검증된 것은 구분해 주세요.

## GitHub Pages

저장소의 **Settings → Pages**에서 **Deploy from a branch**, **main**, **/(root)**를 선택하면 `index.html`을 배포할 수 있습니다.
