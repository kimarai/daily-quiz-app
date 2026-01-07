import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QUESTIONS = [
  {
    id: 1,
    day: 1,
    difficulty: 0,
    category: 'General Knowledge',
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
    correctIndex: 1,
  },
  {
    id: 2,
    day: 2,
    difficulty: 1,
    category: 'Science',
    question: 'What gas do plants absorb from the atmosphere?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Helium'],
    correctIndex: 1,
  },
  {
    id: 3,
    day: 3,
    difficulty: 2,
    category: 'Geography',
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correctIndex: 3,
  },
  {
    id: 4,
    day: 4,
    difficulty: 3,
    category: 'History',
    question: 'In which year did the first human land on the Moon?',
    options: ['1965', '1969', '1972', '1959'],
    correctIndex: 1,
  },
  {
    id: 5,
    day: 5,
    difficulty: 4,
    category: 'Literature',
    question: 'Who wrote “Pride and Prejudice”?',
    options: ['Jane Austen', 'Mary Shelley', 'Emily Brontë', 'Louisa May Alcott'],
    correctIndex: 0,
  },
  {
    id: 6,
    day: 6,
    difficulty: 5,
    category: 'Math',
    question: 'What is the value of 12 × 12?',
    options: ['124', '132', '144', '156'],
    correctIndex: 2,
  },
  {
    id: 7,
    day: 7,
    difficulty: 6,
    category: 'Technology',
    question: 'What does “HTTP” stand for?',
    options: [
      'HyperText Transfer Protocol',
      'High Transmission Text Process',
      'Hyperlink Transfer Program',
      'Host Transfer Technology Protocol',
    ],
    correctIndex: 0,
  },
  {
    id: 8,
    day: 8,
    difficulty: 7,
    category: 'Geography',
    question: 'Which country has the largest population in the world?',
    options: ['India', 'United States', 'China', 'Indonesia'],
    correctIndex: 0,
  },
  {
    id: 9,
    day: 9,
    difficulty: 8,
    category: 'Science',
    question: 'What part of the cell contains genetic material?',
    options: ['Cytoplasm', 'Nucleus', 'Ribosome', 'Cell wall'],
    correctIndex: 1,
  },
  {
    id: 10,
    day: 10,
    difficulty: 9,
    category: 'History',
    question: 'The Magna Carta was originally issued in which country?',
    options: ['France', 'England', 'Spain', 'Germany'],
    correctIndex: 1,
  },
  {
    id: 11,
    day: 11,
    difficulty: 10,
    category: 'Literature',
    question: 'Which novel begins with the line “Call me Ishmael”?',
    options: ['Moby-Dick', 'The Old Man and the Sea', 'Treasure Island', 'Life of Pi'],
    correctIndex: 0,
  },
  {
    id: 12,
    day: 12,
    difficulty: 11,
    category: 'Science',
    question: 'What is the chemical symbol for gold?',
    options: ['Ag', 'Au', 'Gd', 'Go'],
    correctIndex: 1,
  },
  {
    id: 13,
    day: 13,
    difficulty: 12,
    category: 'Geography',
    question: 'Which river runs through the city of Cairo?',
    options: ['Nile', 'Amazon', 'Danube', 'Yangtze'],
    correctIndex: 0,
  },
  {
    id: 14,
    day: 14,
    difficulty: 13,
    category: 'Technology',
    question: 'Moore’s Law primarily relates to the growth of what?',
    options: ['Battery capacity', 'Transistor count', 'Internet speed', 'Screen resolution'],
    correctIndex: 1,
  },
  {
    id: 15,
    day: 15,
    difficulty: 14,
    category: 'Math',
    question: 'What is the square root of 289?',
    options: ['15', '16', '17', '18'],
    correctIndex: 2,
  },
  {
    id: 16,
    day: 16,
    difficulty: 15,
    category: 'History',
    question: 'Which empire built the city of Machu Picchu?',
    options: ['Aztec', 'Mayan', 'Inca', 'Olmec'],
    correctIndex: 2,
  },
  {
    id: 17,
    day: 17,
    difficulty: 16,
    category: 'Science',
    question: 'What is the hardest natural substance on Earth?',
    options: ['Quartz', 'Diamond', 'Corundum', 'Topaz'],
    correctIndex: 1,
  },
  {
    id: 18,
    day: 18,
    difficulty: 17,
    category: 'Geography',
    question: 'Which desert is the largest hot desert in the world?',
    options: ['Gobi', 'Sahara', 'Kalahari', 'Mojave'],
    correctIndex: 1,
  },
  {
    id: 19,
    day: 19,
    difficulty: 18,
    category: 'Literature',
    question: 'Who is the author of “One Hundred Years of Solitude”?',
    options: ['Mario Vargas Llosa', 'Isabel Allende', 'Gabriel García Márquez', 'Jorge Luis Borges'],
    correctIndex: 2,
  },
  {
    id: 20,
    day: 20,
    difficulty: 19,
    category: 'Technology',
    question: 'What is the name of the first programmable electronic computer?',
    options: ['ENIAC', 'UNIVAC', 'Colossus', 'EDSAC'],
    correctIndex: 0,
  },
  {
    id: 21,
    day: 21,
    difficulty: 20,
    category: 'Math',
    question: 'What is the value of π rounded to three decimal places?',
    options: ['3.141', '3.142', '3.143', '3.144'],
    correctIndex: 1,
  },
  {
    id: 22,
    day: 22,
    difficulty: 21,
    category: 'Science',
    question: 'Which element has the atomic number 26?',
    options: ['Cobalt', 'Nickel', 'Iron', 'Zinc'],
    correctIndex: 2,
  },
  {
    id: 23,
    day: 23,
    difficulty: 22,
    category: 'History',
    question: 'The Treaty of Versailles officially ended which war?',
    options: ['World War I', 'World War II', 'Napoleonic Wars', 'Cold War'],
    correctIndex: 0,
  },
  {
    id: 24,
    day: 24,
    difficulty: 23,
    category: 'Geography',
    question: 'Which mountain is the tallest above sea level?',
    options: ['K2', 'Kangchenjunga', 'Mount Everest', 'Lhotse'],
    correctIndex: 2,
  },
  {
    id: 25,
    day: 25,
    difficulty: 24,
    category: 'Literature',
    question: 'Which work is considered the first modern novel?',
    options: ['Don Quixote', 'The Divine Comedy', 'The Odyssey', 'Gulliver’s Travels'],
    correctIndex: 0,
  },
  {
    id: 26,
    day: 26,
    difficulty: 25,
    category: 'Science',
    question: 'Which particle has a negative electric charge?',
    options: ['Proton', 'Neutron', 'Electron', 'Positron'],
    correctIndex: 2,
  },
  {
    id: 27,
    day: 27,
    difficulty: 26,
    category: 'Technology',
    question: 'Which cryptographic algorithm is asymmetric?',
    options: ['AES', 'RSA', 'Blowfish', 'ChaCha20'],
    correctIndex: 1,
  },
  {
    id: 28,
    day: 28,
    difficulty: 27,
    category: 'Math',
    question: 'What is the derivative of sin(x)?',
    options: ['cos(x)', '-cos(x)', '-sin(x)', 'tan(x)'],
    correctIndex: 0,
  },
  {
    id: 29,
    day: 29,
    difficulty: 28,
    category: 'History',
    question: 'Who was the first woman to win a Nobel Prize?',
    options: ['Marie Curie', 'Rosalind Franklin', 'Ada Lovelace', 'Jane Goodall'],
    correctIndex: 0,
  },
  {
    id: 30,
    day: 30,
    difficulty: 29,
    category: 'Science',
    question: 'What is the approximate age of the universe?',
    options: ['4.5 billion years', '13.8 billion years', '27 billion years', '100 billion years'],
    correctIndex: 1,
  },
];

const STORAGE_KEYS = {
  answers: 'dailyQuizAnswers',
  lastAnsweredDate: 'dailyQuizLastAnsweredDate',
  currentDay: 'dailyQuizCurrentDay',
  profile: 'dailyQuizProfile',
};

const getTodayKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const calculateLevel = (correctCount) => {
  if (correctCount <= 9) return 'Beginner';
  if (correctCount <= 14) return 'Learner';
  if (correctCount <= 19) return 'Thinker';
  if (correctCount <= 24) return 'Advanced';
  if (correctCount <= 27) return 'Expert';
  return 'Master';
};

const calculateRank = (accuracy) => {
  if (accuracy >= 90) return 'Top 5%';
  if (accuracy >= 75) return 'Top 15%';
  if (accuracy >= 60) return 'Top 30%';
  if (accuracy >= 40) return 'Top 50%';
  return 'Below Average';
};

export default function App() {
  const [currentDay, setCurrentDay] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [answeredToday, setAnsweredToday] = useState(false);
  const [level, setLevel] = useState('Unranked');
  const [rank, setRank] = useState('Unranked');
  const [accuracy, setAccuracy] = useState(0);
  const [loading, setLoading] = useState(true);

  const todayKey = useMemo(() => getTodayKey(), []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [storedAnswers, storedDate, storedDay, storedProfile] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.answers),
          AsyncStorage.getItem(STORAGE_KEYS.lastAnsweredDate),
          AsyncStorage.getItem(STORAGE_KEYS.currentDay),
          AsyncStorage.getItem(STORAGE_KEYS.profile),
        ]);

        const parsedAnswers = storedAnswers ? JSON.parse(storedAnswers) : [];
        const parsedDay = storedDay ? Number(storedDay) : 1;
        const parsedProfile = storedProfile ? JSON.parse(storedProfile) : null;

        let nextDay = parsedDay || 1;
        let nextAnswers = parsedAnswers;

        if (nextDay === 30 && storedDate && storedDate !== todayKey && parsedAnswers.length === 30) {
          nextDay = 1;
          nextAnswers = [];
          await AsyncStorage.multiRemove([
            STORAGE_KEYS.answers,
            STORAGE_KEYS.lastAnsweredDate,
            STORAGE_KEYS.currentDay,
          ]);
        }

        setAnswers(nextAnswers);
        setCurrentDay(nextDay);
        setAnsweredToday(storedDate === todayKey);

        if (parsedProfile) {
          setLevel(parsedProfile.level || 'Unranked');
          setRank(parsedProfile.rank || 'Unranked');
          setAccuracy(parsedProfile.accuracy || 0);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [todayKey]);

  const questionData = QUESTIONS[(currentDay - 1) % 30];
  const difficulty = (currentDay - 1) % 30;
  const correctCount = answers.filter((answer) => answer.correct).length;
  const isResultsDay = currentDay === 30 && answeredToday;

  const handleAnswer = async (selectedIndex) => {
    if (answeredToday) return;

    const isCorrect = selectedIndex === questionData.correctIndex;
    const updatedAnswers = [...answers, { day: currentDay, correct: isCorrect }];
    const nextDay = currentDay < 30 ? currentDay + 1 : currentDay;

    setAnswers(updatedAnswers);
    setAnsweredToday(true);
    setCurrentDay(nextDay);

    await AsyncStorage.setItem(STORAGE_KEYS.answers, JSON.stringify(updatedAnswers));
    await AsyncStorage.setItem(STORAGE_KEYS.lastAnsweredDate, todayKey);
    await AsyncStorage.setItem(STORAGE_KEYS.currentDay, String(nextDay));

    if (currentDay === 30) {
      const totalCorrect = updatedAnswers.filter((answer) => answer.correct).length;
      const nextAccuracy = Math.round((totalCorrect / 30) * 100);
      const nextLevel = calculateLevel(totalCorrect);
      const nextRank = calculateRank(nextAccuracy);

      setLevel(nextLevel);
      setRank(nextRank);
      setAccuracy(nextAccuracy);

      await AsyncStorage.setItem(
        STORAGE_KEYS.profile,
        JSON.stringify({ level: nextLevel, rank: nextRank, accuracy: nextAccuracy })
      );
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (isResultsDay) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerLabel}>Level: {level}</Text>
          <Text style={styles.headerLabel}>Rank: {rank}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Results</Text>
          <Text style={styles.resultText}>Correct answers: {correctCount} / 30</Text>
          <Text style={styles.resultText}>Level: {level}</Text>
          <Text style={styles.resultText}>Global Rank: {rank}</Text>
          <Text style={styles.note}>New cycle will begin tomorrow.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Level: {level}</Text>
        <Text style={styles.headerLabel}>Rank: {rank}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.dayText}>Day {currentDay} • Difficulty {difficulty}</Text>
        <Text style={styles.questionText}>{questionData.question}</Text>
        <Text style={styles.categoryText}>Category: {questionData.category}</Text>
        {answeredToday ? (
          <Text style={styles.notice}>You already answered today. Come back tomorrow.</Text>
        ) : (
          questionData.options.map((option, index) => (
            <TouchableOpacity
              key={`${questionData.id}-${index}`}
              style={styles.optionButton}
              onPress={() => handleAnswer(index)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))
        )}
      </View>
      <Text style={styles.subText}>Subscriptions coming soon.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    padding: 20,
  },
  header: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLabel: {
    fontSize: 14,
    color: '#2D3A4B',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E2A3A',
    marginBottom: 12,
  },
  dayText: {
    fontSize: 14,
    color: '#617089',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E2A3A',
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 13,
    color: '#8A97A8',
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: '#EFF3F9',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 15,
    color: '#1E2A3A',
  },
  notice: {
    fontSize: 15,
    color: '#D45D5D',
    fontWeight: '600',
  },
  resultText: {
    fontSize: 16,
    color: '#1E2A3A',
    marginBottom: 8,
  },
  note: {
    marginTop: 16,
    fontSize: 14,
    color: '#617089',
  },
  subText: {
    marginTop: 24,
    textAlign: 'center',
    color: '#9AA6B2',
  },
});
