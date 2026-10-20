# PawCare 로보독 배송 관제

PawCare는 AI 동행 프로젝트의 일부로, 로보독을 활용해 어르신의 생활을 돕는 방법을 탐구하는 프로젝트입니다. 이 저장소는 그중 **배송 경로를 정하고 관제 화면에서 운행을 살펴보는 개인 작업**을 모았습니다.

## 프로젝트에서 만든 것

처음에는 Scratch에서 배송지를 순서대로 방문하는 흐름을 구상했습니다. 이후 사용자가 지도에 점을 찍어 A·B·C 배송지를 정하고, 운행 상태를 확인할 수 있도록 Python 제어 프로그램과 HTML 관제 화면으로 확장했습니다.

배송지에 도착하면 로보독 카메라로 해당 지역의 인물 카드를 확인하고 QR 코드의 `GO` 문자를 읽습니다. 재난 수신 micro:bit가 `EMERGENCY:E1` 같은 신호를 PC로 전달하면, Python이 로보독을 멈추고 관제 화면에 상황을 표시합니다. 관제에서 대피 안내를 선택하면 위치 1은 A·B, 위치 2는 B·C의 배송 점을 방문하고, 복귀를 선택하면 출발점으로 돌아가도록 연결했습니다.

## 파일 안내

| 파일 | 설명 |
| --- | --- |
| `index.html` | 프로젝트 소개와 배송 경로 미리보기 |
| `pawcare_control.html` | Python 프로그램과 연결해 쓰는 관제 화면 |
| `robodog_abc_delivery.py` | RoboDog 배송·인식·운행 관제용 Python 코드 |
| `microbit_disaster_sender_makecode.py` | 재난 신호를 보내는 micro:bit MakeCode 예시 |
| `microbit_disaster_receiver_makecode.py` | 라디오 신호를 받아 USB Serial로 PC에 보내는 게이트웨이 예시 |
| `microbit_serial_integration_plan.md` | 라디오·USB Serial·Python·HTML 연결과 신호 규칙 |
| `pawcare_delivery_log.csv`, `pawcare_tilt_log.csv` | 배송·기울기 기록 예시 |
| `README_control_dashboard.txt` | 관제 화면과 Python 실행 안내 |
| `pawcare_source.zip` | 배송 코드와 관련 자료 전체 묶음 |

## 실행과 확인

GitHub Pages에서는 소개 페이지와 화면 미리보기를 볼 수 있습니다. Pages만으로는 로보독을 움직이거나 PC의 COM 포트에서 micro:bit 신호를 읽을 수 없습니다. 실제 재난 연동에는 송신 micro:bit와 PC USB에 연결한 수신 게이트웨이 micro:bit, Python 환경, RoboDog 라이브러리, 맞는 COM 포트 설정이 필요합니다. 자세한 준비 사항은 `README_control_dashboard.txt`를 확인하세요.

코드에 작성된 기능과 로보독 실기기에서 확인된 기능은 구분해서 봐 주세요. 실제 주행이나 센서 동작을 시험하지 않은 기능은 검증 완료로 볼 수 없습니다.

## GitHub Pages 배포

저장소의 **Settings → Pages**에서 **Deploy from a branch**, **main**, **/(root)**를 선택하면 `index.html`을 공개 페이지로 배포할 수 있습니다.
