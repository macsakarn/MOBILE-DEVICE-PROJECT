import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import ShowAnnounces from './showAnnounce';

import axios from 'axios';
const baseURL = 'https://annoucement.herokuapp.com/api/announces';

export default function TextBoxPage({navigation}) {
  const [announcesDB, setAnnouncesDB] = useState([]);

  const getDB = async () => {
    await axios.get(baseURL).then(response => {
      const db = response.data.All_Annouces;
      setAnnouncesDB(db);
    });
  };

  useEffect(() => {
    getDB();
  }, [announcesDB]);

let content = <ShowAnnounces navigation={navigation} announcesDB={announcesDB} />;

  return (
      <View style={styles.container}>{content}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
