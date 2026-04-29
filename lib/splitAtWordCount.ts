export function splitAtWordCount(text: string, wordLimit: number = 200) {
  const words = text.split(' ')
  
  if (words.length <= wordLimit) {
    return { before: text, after: '' }
  }

  const before = words.slice(0, wordLimit).join(' ')
  const after = words.slice(wordLimit).join(' ')
  
  return { before, after }
}