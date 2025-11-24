'use client'

import { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [conversionType, setConversionType] = useState('direct-to-polite')
  const [inputText, setInputText] = useState('')
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [style, setStyle] = useState('gentle')
  const [relation, setRelation] = useState('leader')

  const handleConversion = async () => {
    if (!inputText.trim()) {
      alert('请先输入需要精进的表达内容')
      return
    }

    setIsLoading(true)
    setResult('')

    try {
      const endpoint = conversionType === 'direct-to-polite'
        ? '/api/convert/direct-to-polite'
        : '/api/convert/polite-to-direct'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          style,
          relation,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setResult(data.data.result)
      } else {
        alert('润色失败：' + (data.error || '网络异常'))
      }
    } catch (error) {
      console.error('转换错误:', error)
      alert('网络连接异常，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  const copyResult = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    alert('佳作已复制到剪贴板')
  }

  const clearContent = () => {
    setInputText('')
    setResult('')
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>高情商沟通艺术工坊</h1>
        <p className={styles.subtitle}>
          智慧表达 · 优雅沟通 · 成就非凡影响力
        </p>
      </header>

      <main className={styles.main}>
        {/* 左侧控制面板 */}
        <div className={styles.leftPanel}>
          <div className={styles.controlCard}>
            {/* 转换类型选择 */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>表达方式精进</h2>
              <div className={styles.typeButtons}>
                <button
                  className={`${styles.typeBtn} ${conversionType === 'direct-to-polite' ? styles.active : ''}`}
                  onClick={() => setConversionType('direct-to-polite')}
                >
                  <span className={styles.typeIcon}>💎</span>
                  <span className={styles.typeText}>直抒胸臆 → 温文尔雅</span>
                  <small>化刚为柔，以德服人</small>
                </button>
                <button
                  className={`${styles.typeBtn} ${conversionType === 'polite-to-direct' ? styles.active : ''}`}
                  onClick={() => setConversionType('polite-to-direct')}
                >
                  <span className={styles.typeIcon}>🎯</span>
                  <span className={styles.typeText}>委婉含蓄 → 开门见山</span>
                  <small>去繁就简，直击要害</small>
                </button>
              </div>
            </div>

            {/* 关系选择 */}
            <div className={styles.section}>
              <label className={styles.label}>沟通对象研判</label>
              <select
                className={styles.select}
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
              >
                <option value="leader">👑 尊者（上级领导）</option>
                <option value="colleague">🤝 同侪（平级同事）</option>
                <option value="subordinate">👨‍💼 部属（下属团队）</option>
                <option value="client">💼 贵客（重要客户）</option>
                <option value="supplier">🤝 伙伴（商业伙伴）</option>
              </select>
            </div>

            {/* 风格选择 */}
            {conversionType === 'direct-to-polite' && (
              <div className={styles.section}>
                <label className={styles.label}>修辞风格定制</label>
                <div className={styles.styleGrid}>
                  <label className={styles.styleOption}>
                    <input
                      type="radio"
                      name="style"
                      value="gentle"
                      checked={style === 'gentle'}
                      onChange={(e) => setStyle(e.target.value)}
                    />
                    <div className={styles.styleCard}>
                      <span className={styles.styleIcon}>🌙</span>
                      <div className={styles.styleText}>温润如玉</div>
                    </div>
                  </label>
                  <label className={styles.styleOption}>
                    <input
                      type="radio"
                      name="style"
                      value="strict"
                      checked={style === 'strict'}
                      onChange={(e) => setStyle(e.target.value)}
                    />
                    <div className={styles.styleCard}>
                      <span className={styles.styleIcon}>🏛️</span>
                      <div className={styles.styleText}>庄重威严</div>
                    </div>
                  </label>
                  <label className={styles.styleOption}>
                    <input
                      type="radio"
                      name="style"
                      value="neutral"
                      checked={style === 'neutral'}
                      onChange={(e) => setStyle(e.target.value)}
                    />
                    <div className={styles.styleCard}>
                      <span className={styles.styleIcon}>⚖️</span>
                      <div className={styles.styleText}>中正平和</div>
                    </div>
                  </label>
                  <label className={styles.styleOption}>
                    <input
                      type="radio"
                      name="style"
                      value="emotional"
                      checked={style === 'emotional'}
                      onChange={(e) => setStyle(e.target.value)}
                    />
                    <div className={styles.styleCard}>
                      <span className={styles.styleIcon}>💝</span>
                      <div className={styles.styleText}>情深意切</div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* 输入文本 */}
            <div className={styles.section}>
              <label className={styles.label}>原文润色</label>
              <textarea
                className={styles.textarea}
                placeholder="请输入需要精进的表达..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={4}
              />
            </div>

            {/* 转换按钮 */}
            <button
              className={styles.convertBtn}
              onClick={handleConversion}
              disabled={isLoading}
            >
              <span className={styles.btnIcon}>
                {isLoading ? '⏳' : conversionType === 'direct-to-polite' ? '✨' : '🎭'}
              </span>
              <span className={styles.btnText}>
                {isLoading ? '精工细作中...' : '开始艺术化表达'}
              </span>
            </button>
          </div>
        </div>

        {/* 右侧结果面板 */}
        <div className={styles.rightPanel}>
          <div className={styles.resultCard}>
            <div className={styles.resultHeader}>
              <h3 className={styles.resultTitle}>
                {result ? '雅韵成果' : '佳作即将呈现'}
              </h3>
              {result && (
                <div className={styles.actionButtons}>
                  <button className={styles.actionBtn} onClick={copyResult} title="复制佳作">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2H12M8 2C8 2 8 14 8 14M8 2C8 2 3 2 3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <button className={styles.actionBtn} onClick={clearContent} title="重新创作">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <div className={styles.resultContent}>
              {isLoading ? (
                <div className={styles.loadingState}>
                  <div className={styles.loadingDots}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <p>艺术大师正在精心雕琢您的表达...</p>
                </div>
              ) : result ? (
                <div className={styles.resultText}>{result}</div>
              ) : (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>
                    <div className={styles.emptyEmoji}>🎨</div>
                  </div>
                  <h4>开启高情商表达之旅</h4>
                  <p>选择您的表达方式，输入需要润色的文本，让AI为您呈现更具影响力的沟通艺术</p>
                  <div className={styles.usageTips}>
                    <h5>✨ 创作指南</h5>
                    <ul>
                      <li>清晰的原始表达是成功的基石</li>
                      <li>精准选择对象与风格，事半功倍</li>
                      <li>灵活切换表达方式，游刃有余</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>高情商沟通艺术工坊 · 成就你的影响力传奇</p>
      </footer>
    </div>
  )
}
