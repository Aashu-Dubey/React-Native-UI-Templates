import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Pressable,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppImages } from '../res';
import { TextInput } from 'react-native-gesture-handler';
import Config from './Config';

interface Props {}

const FeedbackScene: React.FC<Props> = () => {
  const navigation = useNavigation<DrawerNavigationProp<{}>>();

  const marginTop = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  return (
    <SafeAreaView style={{ flex: 1, marginTop }}>
      <View style={{ flexDirection: 'row', padding: 8, paddingBottom: 0 }}>
        <Pressable
          style={({ pressed }) => [
            {
              padding: 8,
              paddingBottom: 0,
              opacity: !Config.isAndroid && pressed ? 0.4 : 1,
            },
          ]}
          onPress={() => navigation.openDrawer()}
          android_ripple={{ color: 'grey', radius: 20, borderless: true }}
        >
          <Icon name="menu" size={25} color="black" />
        </Pressable>
      </View>
      <KeyboardAvoidingView behavior="position">
        <Image
          style={styles.image}
          source={AppImages.feedbackImage}
          resizeMode="cover"
        />
        <Text style={styles.title}>Your FeedBack</Text>
        <Text style={styles.subTitle}>
          Give your best time for this moment.
        </Text>
        <TextInput style={styles.input} placeholder="Enter your feedback..." />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { opacity: !Config.isAndroid && pressed ? 0.4 : 1 },
          ]}
          android_ripple={{ color: 'grey' }}
        >
          <Text style={styles.buttonText}>Send</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    paddingHorizontal: 16,
    width: undefined,
    height: 320,
  },
  title: {
    fontSize: 20,
    fontFamily: 'WorkSans-Bold',
    textAlign: 'center',
    paddingTop: 8,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    textAlign: 'center',
    paddingTop: 16,
  },
  input: {
    marginTop: 16,
    marginHorizontal: 32,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 8,
    minHeight: 80,
    maxHeight: 160,
    paddingHorizontal: 10,
    padding: 16,
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    textAlignVertical: 'top',
  },
  button: {
    width: 120,
    height: 40,
    padding: 8,
    marginTop: 16,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue',
    borderRadius: 4,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    padding: 4,
  },
});

export default FeedbackScene;
