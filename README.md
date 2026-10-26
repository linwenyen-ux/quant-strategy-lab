# 量化策略實驗室

台股／美股日線策略回測平台 — 單檔網頁應用，可安裝為手機 App（PWA）。

**線上版：** https://linwenyen-ux.github.io/quant-strategy-lab/

## 功能
- 39 支策略（Alorse 30 支 ＋ 台股常用 8 支 ＋ Dual CCI）× 台股／美股
- 穩健性檢驗：隨機基準檢定、成本敏感度、交易序列模擬、Walk-Forward
- 今日訊號、策略組合、自訂策略、多股批次、標的風險卡
- 資料來源：FinMind 開放 API（免 token）

## 安裝到手機
用手機瀏覽器開啟上面的網址：
- **iPhone**：Safari → 分享 → 加入主畫面
- **Android**：Chrome → ⋮ → 安裝應用程式

## 檔案
| 檔案 | 用途 |
|---|---|
| `index.html` | 應用程式本體（單檔，無相依套件） |
| `manifest.json` | PWA 設定 |
| `sw.js` | Service Worker（離線快取） |
| `icons/` | 應用程式圖示 |

## 注意
本工具為研究用途，不構成投資建議。所有數字來自歷史回測，不保證未來績效。
