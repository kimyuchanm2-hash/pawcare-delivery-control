# PawCare 로보독 배송 관제

PawCare는 AI 동행 프로젝트의 일부로, 로보독을 활용해 어르신의 생활을 돕는 방법을 탐구하는 프로젝트입니다. 이 저장소는 그중 **배송 경로를 정하고 관제 화면에서 운행을 살펴보는 개인 작업**을 모았습니다.

## 프로젝트에서 만든 것

처음에는 Scratch에서 배송지를 순서대로 방문하는 흐름을 구상했습니다. 이후 사용자가 지도에 점을 찍어 A·B·C 배송지를 정하고, 운행 상태를 확인할 수 있도록 Python 제어 프로그램과 HTML 관제 화면으로 확장했습니다.

배송지에 도착하면 로보독 카메라로 해당 지역의 인물 카드를 확인하고 QR 코드의 `GO` 문자를 읽습니다. 재난 수신 micro:bit가 `RX:E1` 같은 신호를 PC로 전달하면, Python이 로보독을 멈추고 관제 화면에 상황을 표시합니다. 관제에서 대피 안내를 선택하면 위치 1은 A·B, 위치 2는 B·C의 배송 점을 방문하고, 복귀를 선택하면 출발점으로 돌아가도록 연결했습니다.

## 최신 연동 코드 3개

이 세 파일은 라디오 그룹 1과 `RX:<신호>` 시리얼 형식으로 연결됩니다. 관측소 송신기 → PC USB 수신 micro:bit(COM10) → Python 관제 → RoboDog(COM8) 순서입니다.

| 코드 | 역할 |
| --- | --- |
| [RoboDog 배송·관제 Python 코드](robodog_abc_delivery.py) | 배송 이동, 인물·QR 확인, 재난 정지와 관제 명령 처리 |
| [PC 수신 micro:bit MakeCode 코드](microbit_pc_receiver_makecode.ts) | 그룹 1 라디오 수신 후 `RX:E1` 형식으로 USB 시리얼 전달 |
| [관측소 센서 송신 micro:bit MakeCode 코드](microbit_disaster_station_sender_makecode.ts) | 지진·화재·가스·무더위 신호를 그룹 1로 송신 |

MakeCode 파일은 TypeScript/JavaScript 코드입니다. MakeCode의 JavaScript 탭에 붙여 넣어 사용하세요. 실제 COM 번호가 다르면 Python 코드의 포트 설정을 연결 상태에 맞춰야 합니다.

## 추가 파일 안내

| 파일 | 설명 |
| --- | --- |
| `index.html` | 프로젝트 소개와 배송 경로 미리보기 |
| `pawcare_control.html` | Python 프로그램과 연결해 쓰는 관제 화면 |
| `microbit_disaster_sender_makecode.py`, `microbit_disaster_receiver_makecode.py` | 이전 MakeCode Python 예시 |
| `microbit_serial_integration_plan.md` | 라디오·USB Serial·Python·HTML 연결과 신호 규칙 |
| `pawcare_delivery_log.csv`, `pawcare_tilt_log.csv` | 배송·기울기 기록 예시 |
| `README_control_dashboard.txt` | 관제 화면과 Python 실행 안내 |
| `pawcare_source.zip` | 이전 배포 자료 묶음 |

## 실행과 확인

GitHub Pages에서는 소개 페이지와 화면 미리보기를 볼 수 있습니다. Pages만으로는 로보독을 움직이거나 PC의 COM 포트에서 micro:bit 신호를 읽을 수 없습니다. 실제 재난 연동에는 관측소 송신 micro:bit, PC USB에 연결한 수신 micro:bit, Python 환경, RoboDog 라이브러리, 맞는 COM 포트 설정이 필요합니다.

코드에 작성된 기능과 로보독 실기기에서 확인된 기능은 구분해서 봐 주세요. 저장소의 코드는 연동용 최종본이지만, 현재 연결 환경의 COM 포트와 실기기 주행은 사용자가 다시 확인해야 합니다.

## GitHub Pages 배포

저장소의 **Settings → Pages**에서 **Deploy from a branch**, **main**, **/(root)**를 선택하면 `index.html`을 공개 페이지로 배포할 수 있습니다.
