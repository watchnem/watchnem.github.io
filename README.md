# watchnem.github.io

Jekyll 기반 포트폴리오 사이트와 Blogspot 동기화 도구입니다.

## 사이트 실행

```powershell
bundle update
jekyll serve
jekyll serve --host 0.0.0.0
```

## Blogspot 동기화

기존 실행 방식은 유지됩니다.

```powershell
python portfolio_sync.py
python portfolio_sync.py --dry-run
python portfolio_sync.py --skip-fetch
python portfolio_sync.py --site-root "D:\toy\watchnem.github.io"
```

동기화 흐름:

1. Blogger API에서 게시글을 가져와 `blog_posts.json` 저장
2. 게시글 HTML에서 이미지 URL을 추출해 `blog_posts_정제된.json` 저장
3. 제목을 `YYYY-MM-DD | 장소 | 촬영번호 | 닉네임 | 작품명 | 캐릭터명` 형식으로 파싱
4. `_posts/*.md` 생성
5. `_config.yml`의 `permitted_categories`에 닉네임 추가
6. 없는 경우 `models/<nickname>.html` 생성

## 코드 구조

- `portfolio_sync.py`: 예전 명령을 유지하는 얇은 wrapper
- `scripts/portfolio_sync/blogger.py`: Blogger API 접근
- `scripts/portfolio_sync/parsing.py`: 제목 파싱, 이미지 URL 추출, 파일명 정리
- `scripts/portfolio_sync/rendering.py`: Jekyll post markdown 렌더링
- `scripts/portfolio_sync/jekyll.py`: `_config.yml` 갱신
- `scripts/portfolio_sync/models.py`: 모델 페이지 생성
- `scripts/portfolio_sync/storage.py`: JSON 저장/로드와 `_posts` 쓰기
- `scripts/portfolio_sync/users.py`: 닉네임과 X 계정 매핑
- `scripts/portfolio_sync/cli.py`: CLI 인자 처리

## 원본 보존

리팩토링 전 원본 파일은 `_old/`에 보관합니다.
