import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import styles from './styles'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem';

function TeacherList() {
  const [teachers, setTeachers] = useState([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response)
        const favoritedTeachersIDs = favoritedTeachers.map((teacher: Teacher) => teacher.id)
        setFavorites(favoritedTeachersIDs)
      }
    })
  }

  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  async function handleFiltersSubmit() {
    loadFavorites();
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    })

    setIsFilterVisible(false)
    setTeachers(response.data)
  }

  useFocusEffect(() => {
    loadFavorites()
  })

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={ () => setIsFilterVisible(!isFilterVisible) }>
          <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        )}
      >

        { isFilterVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              value={subject}
              onChangeText={text => setSubject(text)}
              style={styles.input}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  value={time}
                  onChangeText={text => setTime(text)}
                  style={styles.input}
                  placeholder="Qual o horário?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>

            <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}

      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >

        {teachers.map((teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          )
        })}

      </ScrollView>
  
    </View>
  )
}

export default TeacherList;

// 00:48:00