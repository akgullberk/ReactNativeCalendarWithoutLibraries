import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Haftanın günleri
const weekDays = ['Paz', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];


const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};
//verilen yıl ve ay için ayın kaç gün sürdüğünü hesaplamak için kullanılır

const getFirstDayOfMonth = (year, month) => {
  const date = new Date(year, month, 1);
  const day = date.getDay();
  // Haftanın Pazartesi gününden başladığını kabul ederiz.
  // getDay() Pazartesi'yi 1, Pazar'ı ise 0 olarak döndürür.
  return (day === 0 ? 6 : day - 1);
};

//verilen yıl ve ay için ayın ilk gününün haftanın hangi günü olduğunu hesaplamak için kullanılır.


const generateMonths = (year) => { //Yılın her ayını ve her ayın günlerini hesaplar ve döndürür.
  const months = []; //Ayları depolayacak bir dizi oluşturur.
  for (let i = 0; i < 12; i++) {
    const date = new Date(year, i, 1); //Ayın ilk gününü temsil eden bir Date nesnesi oluşturur.
    
    if (date.toString() === 'Invalid Date') { 
      continue;
    }
    //Geçersiz bir tarih olup olmadığını kontrol eder.
    
    const daysInMonth = getDaysInMonth(year, i); //O ayın kaç gün sürdüğünü hesaplar.
    const firstDayOfMonth = getFirstDayOfMonth(year, i); //Ayın ilk gününün haftanın hangi günü olduğunu hesaplar.
    const daysArray = []; //Ayın tüm günlerini saklamak için bir dizi oluşturur.
    
    for (let j = 0; j < firstDayOfMonth; j++) {
      daysArray.push("");
    }
    //Ayın ilk gününden önceki boş günleri (null) doldurur.

    for (let j = 1; j <= daysInMonth; j++) {
      daysArray.push(j);
    }
    //Gerçek günleri diziye ekler.

    months.push({
      month: date.toLocaleString('default', { month: 'long' }), 
      year,
      days: daysArray,
    });
    //toLocaleString() metodu ile kullanıcının yerel ayarlarına uygun bir biçimde döndürür
    //'default': Bu yerel ayar belirtecinin, herhangi bir özel yerel ayar belirtmeden, varsayılan yerel ayarları kullanmak anlamına gelir. 
    //month: 'long': Ayın tam adını döndürür.
    //year: Yılı döndürür.
    //days: Bu özellik, ayın günlerini içeren daysArray ile doldurulur.
  }
  return months;
};

// Yıllık takvim bileşeni
const YearCalendar = ({ year }) => {
  const months = generateMonths(year);

  return (
    <View style={styles.container}>
      {months.map((monthData, index) => (
        <View key={index} style={styles.monthContainer}>
          <Text style={styles.monthTitle}>{monthData.month} {monthData.year}</Text>
          <View style={styles.grid}>
            {/* Haftanın günleri başlıklarını gösterir */}
            {weekDays.map((dayName, dayIndex) => (
              <View key={dayIndex} style={styles.dayHeader}>
                <Text style={styles.dayHeaderText}>{dayName}</Text>
              </View>
            ))}
          </View>
          <View style={styles.grid}>
            {monthData.days.map((day, dayIndex) => (
              // dizisindeki her öğeyi  işlemek için map fonksiyonu kullanılır.Bu, her ay için bir View bileşeni oluşturur.
              //monthData her ayın verilerini içerir, index ise her ayın dizideki sırasını belirtir.
              //key={index}: React’in her öğeyi benzersiz bir şekilde tanımlamasına yardımcı olur ve performans iyileştirmeleri sağlar. index burada dizideki sırayı belirtir.
              <View key={dayIndex} style={styles.day}> 
                {/* Eğer day null değilse, day'i göster */}
                {day !== null ? <Text>{day}</Text> : <Text>-</Text>}
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

// Stil tanımları
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  monthContainer: {
    marginBottom: 20,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day: {
    width: '14.28%', // 100% / 7 days
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dayHeader: {
    width: '14.28%', // 100% / 7 days
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f0f0f0',
  },
  dayHeaderText: {
    fontWeight: 'bold',
  },
});

export default YearCalendar;
