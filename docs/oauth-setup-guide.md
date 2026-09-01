# 로그인 설정 — 복사 붙여넣기 없이 바로 쓰기
### Camnemi TOPIK — Supabase Auth (Camnemi_Application, srwatzpxnpxohhodylgc)

> **빠른 길:** 이메일+비밀번호 로그인은 **설정 없이 지금 바로 동작**합니다.
> Google/Facebook 버튼이 동작하려면 아래 1~2단계만 진행하세요.
> 대시보드: https://supabase.com/dashboard/project/srwatzpxnpxohhodylgc

---

## 0. 이메일 로그인 (설정 불필요 — 이미 완료 ✅)
- `login.html`에 이메일+비밀번호 폼을 추가해뒀습니다.
- 검증 완료: 가입 → 이메일 확인 → `profiles` 자동 생성 → 로그인 → 진행도 동기화
- **외부 자격증명, 복사 붙여넣기 전혀 없음. 바로 사용 가능.**

---

## 1. Google 로그인 (10분)

### 1-1. Google Cloud Console에서 OAuth 앱 만들기
1. https://console.cloud.google.com → 프로젝트 선택/생성 (예: `camnemi-topik`)
2. **APIs & Services → OAuth consent screen**
   - User type: External
   - App name: `Camnemi TOPIK`, 지원 이메일 입력
   - Scopes: 기본(email, profile) 유지 → Save
3. **Credentials → Create Credentials → OAuth client ID**
   - Application type: **Web application**
   - **Authorized redirect URIs** 에 추가:
     ```
     https://srwatzpxnpxohhodylgc.supabase.co/auth/v1/callback
     ```
   - 만들면 **Client ID** 와 **Client secret** 이 나옵니다 → 복사

### 1-2. Supabase 대시보드에 붙이기
- **Authentication → Providers → Google**
- Enable 토글 ON
- Client ID / Client secret 붙여넣기 → Save

---

## 2. Facebook 로그인 (10분)

### 2-1. Meta for Developers에서 앱 만들기
1. https://developers.facebook.com → My Apps → Create App
   - Use case: **Authenticate and request data from users** (다른 용도 아님)
2. **Settings → Basic** 에서 App ID / App Secret 확인
3. **Facebook Login → Settings** (또는 Products에서 Facebook Login 추가)
   - **Valid OAuth redirect URIs** 에 추가:
     ```
     https://srwatzpxnpxohhodylgc.supabase.co/auth/v1/callback
     ```
4. 앱을 **Live 모드**로 전환 (Development 상태면 타인 로그인 불가)

### 2-2. Supabase 대시보드에 붙이기
- **Authentication → Providers → Facebook**
- Enable 토글 ON
- Client ID(=App ID) / Client secret(=App Secret) 붙여넣기 → Save

---

## 3. Redirect URL (공통, 중요!)
Supabase 대시보드 **Authentication → URL Configuration → Redirect URLs** 에
운영 도메인도 추가해야 합니다:
```
https://<your-site-domain>/login.html
http://127.0.0.1:8731/login.html   (로컬 테스트용)
```

---

## 4. 동작 확인
1. 로컬 서버 실행 후 `http://127.0.0.1:8731/login.html` 접속
2. **Continue with Google / Facebook** 클릭
3. 로그인 성공 → `index.html?welcome=1` 로 돌아오면 ✅
4. 네비게이션 우측에 사용자 이니셜 칩 + 로그아웃 버튼 표시

> 로그인하면 연습 진행도가 `topik_progress` 테이블에 자동 저장되고,
> 다른 기기에서 로그인하면 복원됩니다.

---

## 트러블슈팅
| 증상 | 원인/해결 |
|---|---|
| "redirect_uri_mismatch" | 리다이렉트 URI가 플랫폼 콘솔과 Supabase 양쪽에 정확히 일치해야 함 |
| Facebook "invalid key hash" (앱) | 네이티브 앱이면 해시 필요하지만 웹은 불필요 |
| 로그인 후 빈 화면 | Redirect URL 목록에 현재 도메인/login.html 누락 |
| 콘솔 "Auth session missing" | 캐시 문제 — 쿠키/시크릿으로 재시도 |
