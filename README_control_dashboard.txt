PawCare 배송 관제 · RoboDog + 재난 micro:bit 게이트웨이

실행 파일
- robodog_abc_delivery.py : PC Thonny용 Python. RoboDog 배송, USB 재난 신호 수신, 로컬 웹 서버를 함께 실행합니다.
- pawcare_control.html : 배송 지도와 로봇 상태, 재난 정보, 운행 기록을 보여주는 화면입니다.
- microbit_disaster_receiver_makecode.py : 라디오 재난 신호를 받아 `EMERGENCY:E1` 한 줄로 PC에 전달합니다.

장치 연결
- RoboDog: PC USB, 프로젝트 기본 포트 COM8.
- 재난 수신 게이트웨이 micro:bit: PC USB, Python 기본 포트 COM6 / 115200 baud.
- 송신 micro:bit: 구간에 두고 그룹 1로 E1/F2/G1/H2 형식의 신호를 보냅니다.
- 포트 번호는 Windows 장치 관리자에서 확인합니다. 다른 번호라면 Python 파일 상단의 ROBODOG_PORT 또는 MICROBIT_PORT 기본값을 바꿉니다.

재난 신호
- 앞 글자 E=지진, F=화재, G=가스 유출, H=무더위.
- 뒤 숫자 1은 A·B, 2는 B·C에 적용됩니다.
- 재난 신호가 오면 로보독 동작을 정지하고 눈 LED에 종류별 모양을 표시한 뒤 관제 명령을 기다립니다.
- 화면의 `대피 안내`를 누르면 현재 배송 계획에서 영향받는 점으로 이동해 빨간 몸체 LED와 짖기 소리로 알립니다. 순차 배송은 위치 1일 때 A→B, 위치 2일 때 B→C를 방문합니다. 단일 배송이면 선택한 배송지가 영향 지역에 포함될 때 그 점에서 안내합니다.
- `출발점 복귀`를 누르면 진행 중인 배송을 멈추고 출발점으로 경로를 바꿉니다.
- 대피 안내가 끝나면 중단했던 배송 동작으로 돌아갑니다. 실제 이동 경로는 지도 점과 자이로 추정에 따라 계산합니다.

실행 순서
1. 송신용 micro:bit와 수신 게이트웨이용 micro:bit에 각각 MakeCode 코드를 올립니다. 두 프로그램 모두 radio group 1이어야 합니다.
2. 수신 micro:bit를 PC USB에 연결하고 포트를 확인합니다. 시리얼 모니터 등 COM 포트를 사용하는 다른 프로그램은 닫습니다.
3. RoboDog를 PC에 연결합니다.
4. 압축을 푼 뒤 `robodog_abc_delivery.py`와 `pawcare_control.html`을 같은 폴더에 둡니다. ZIP 안에서 직접 실행하지 마세요.
5. Thonny에서 `robodog_abc_delivery.py`를 실행합니다. 브라우저에서 `http://127.0.0.1:8765/`를 엽니다.
6. 배송 운행을 시작하고 송신 micro:bit에서 시험 신호를 보냅니다. 화면의 재난 카드에서 대피 안내 또는 출발점 복귀를 선택합니다.

연결 주의
- 수신 micro:bit를 RoboDog에만 연결해 둔 경우 PC Python은 USB Serial을 받을 수 없습니다. 이 구성에서는 게이트웨이를 PC USB에 연결해야 합니다.
- GitHub Pages는 정적 웹페이지라 COM 포트와 로봇을 직접 제어하지 않습니다. 실제 작동에는 Python 서버와 PC 로컬 관제 화면이 필요합니다.
- 로보독·재난 신호의 실제 동작은 기기에서 별도로 시험해야 합니다. 지도 위치는 엔코더나 GPS 실측이 아니라 이동량과 자이로에 따른 추정값입니다.
