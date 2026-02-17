// Создайте файл text.txt с любым текстом (10-15 предложений). Напишите скрипт, который читает этот файл и создает новый файл analysis.txt со следующей статистикой:
// Общее количество символов
// Количество слов
// Количество предложений
// Самые длинное слово
const fs = require("fs")
const path = require("path");

const dirPath = path.join(__dirname, "files");
const analysisPath = path.join(dirPath,"analysis.txt")

function getTokens(text){
  const trimedTokens = /^[\s"'“”„«»()[\]{}]+|[\s"'“”„«»()[\]{}.,!?;:]+$/g
  return text
  .split(/\s+/)
  .map(t => t.replace(trimedTokens,""))
  .filter(t => t.length > 0)
}

function countCharacters(text){
  const totalCaracters = text.length
  return totalCaracters
}

function countWords(tokens){
  const wordsCount = tokens.length
  return wordsCount
}

function findLongestWord(tokens){
  if(tokens.length === 0) return ""
  let longest = "" 
 for(const t of tokens){
  if(t.length > longest.length) longest = t
  } return longest
}

function isAlphabeticWord(token){
  const alphabetWord = /^[\p{L}]+(?:-[\p{L}]+)*$/u
  return alphabetWord.test(token)
}

function findLongestAlphabeticWord(tokens){
  if(tokens.length === 0) return ""
  let longestAlphabeticWord = ""
for(const t of tokens){
  if(isAlphabeticWord(t)){
if(t.length > longestAlphabeticWord.length) longestAlphabeticWord = t
}
}
return longestAlphabeticWord 
}

function countSentences(text) {
  const safeText = text
     .replace(/\b\d{1,2}\.\d{1,2}\.\d{4}\b/g, (match) => match.replace(/\./g, "<DOT>"))
     .replace(/\b\d+\.\d+\b/g, (match) => match.replace(/\./g, "<DOT>"))
     .replace(/\b(?:Dr|Mr)\./g, (match) => match.replace(/\./g, "<DOT>"));

  
  const ellipsisMatches = safeText.match(/\.\.\./g);
  const ellipsisCount = ellipsisMatches ? ellipsisMatches.length : 0;

  const textWithoutEllipsis = safeText.replace(/\.\.\./g, "");

  const endMatches = textWithoutEllipsis.match(/[.!?](?=\s|$|["'»”)\]])/g);
  const endCount = endMatches ? endMatches.length : 0;

  return ellipsisCount + endCount;
}


fs.mkdir(dirPath, {recursive: true}, (err) => {
  if(err) {
    console.error("Catalog was not created:", err)
    return
  }
  console.log("Catalog was successfull created")

  fs.readFile("text.txt", "utf-8",(err,text) => {
   if(err){
    console.error("File was not readed",err)
    return
   }
   console.log("File was readed")
   const tokens = getTokens(text)
   const totalChars = countCharacters(text)
   const wordsCount = countWords(tokens)
   const sentencesCount = countSentences(text)
   const longestWord = findLongestWord(tokens)
   const longestAlphabetic = findLongestAlphabeticWord(tokens)
   const report = `Total characters: ${totalChars} 
  Word Count: ${wordsCount} 
  Sentence Count: ${sentencesCount} 
  Longest Word: ${longestWord}
  longest Alphabetic Word: ${longestAlphabetic}`.trim()

  fs.writeFile(analysisPath, report,"utf-8", (err) => {
   if(err){
    console.error("File was not written",err)
    return
   }
   console.log("File was written") 
   })
  })
})
