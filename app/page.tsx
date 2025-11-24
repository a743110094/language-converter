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
      alert('请输入需要转换的文本')
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
        alert('转换失败：' + (data.error || '未知错误'))
      }
    } catch (error) {
      console.error('转换错误:', error)
      alert('网络请求失败，请检查网络连接')
    } finally {
      setIsLoading(false)
    }
  }

  const copyResult = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    alert('已复制到剪贴板')
  }

  const clearContent = () => {
    setInputText('')
    setResult('')
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>智能语言转换工具</h1>
        <p className={styles.subtitle}>
          AI智能沟通顾问，让表达更得体
        </p>
      </header>

      <main className={styles.main}>
        {/* 转换类型选择 */}
        <div className={styles.typeSection}>
          <h2 className={styles.sectionTitle}>选择转换类型</h2>
          <div className={styles.typeButtons}>
            <button
              className={`${styles.typeBtn} ${conversionType === 'direct-to-polite' ? styles.active : ''}`}
              onClick={() => setConversionType('direct-to-polite')}
            >
              <span className={styles.btnIcon}>💬</span>
              <span className={styles.btnText}>直白 → 委婉</span>
            </button>
            <button
              className={`${styles.typeBtn} ${conversionType === 'polite-to-direct' ? styles.active : ''}`}
              onClick={() => setConversionType('polite-to-direct')}
            >
              <span className={styles.btnIcon}>⚡</span>
              <span className={styles.btnText}>委婉 → 直白</span>
            </button>
          </div>
        </div>

        {/* 关系选择 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>沟通对象</label>
          <select
            className={styles.select}
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
          >
            <option value="leader">👔 领导</option>
            <option value="colleague">👥 同事</option>
            <option value="subordinate">👨‍💼 下属</option>
            <option value="client">🤝 客户</option>
            <option value="supplier">📦 供应商</option>
          </select>
        </div>

        {/* 风格选择 */}
        {conversionType === 'direct-to-polite' && (
          <div className={styles.formGroup}>
            <label className={styles.label}>表达风格</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="style"
                  value="gentle"
                  checked={style === 'gentle'}
                  onChange={(e) => setStyle(e.target.value)}
                />
                <span>🌸 温和型</span>
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="style"
                  value="strict"
                  checked={style === 'strict'}
                  onChange={(e) => setStyle(e.target.value)}
                />
                <span>📐 严格型</span>
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="style"
                  value="neutral"
                  checked={style === 'neutral'}
                  onChange={(e) => setStyle(e.target.value)}
                />
                <span>⚖️ 中性型</span>
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="style"
                  value="emotional"
                  checked={style === 'emotional'}
                  onChange={(e) => setStyle(e.target.value)}
                />
                <span>💖 情绪价值型</span>
              </label>
            </div>
          </div>
        )}

        {/* 输入文本 */}
        <div className={styles.formGroup}>
          <label className={styles.label}>输入文本</label>
          <textarea
            className={styles.textarea}
            placeholder="请输入需要转换的文本..."
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
            {isLoading ? '⏳' : conversionType === 'direct-to-polite' ? '✨' : '⚡'}
          </span>
          <span className={styles.btnText}>
            {isLoading ? '转换中...' : conversionType === 'direct-to-polite' ? '优化为温和表达' : '优化为直接表达'}
          </span>
        </button>

        {/* 结果展示 */}
        {result && (
          <div className={styles.resultSection}>
            <div className={styles.resultHeader}>
              <h2 className={styles.sectionTitle}>转换结果</h2>
              <div className={styles.actionButtons}>
                <button className={styles.actionBtn} onClick={copyResult}>
                  📋 复制
                </button>
                <button className={styles.actionBtn} onClick={clearContent}>
                  🗑️ 清空
                </button>
              </div>
            </div>
            <div className={styles.resultContent}>
              {result}
            </div>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Powered by MiniMax Agent - 让沟通更智慧</p>
      </footer>
    </div>
  )
}
