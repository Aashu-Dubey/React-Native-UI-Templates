import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  StatusBar,
  Pressable,
  Image,
  KeyboardAvoidingView,
  useWindowDimensions,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppImages } from '../res';
import Config from './Config';

interface Props {}

const FeedbackScene: React.FC<Props> = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<DrawerNavigationProp<{}>>();

  const { top } = useSafeAreaInsets();
  const imageSize = width - 32;

  const marginTop = Platform.OS === 'ios' ? top : StatusBar.currentHeight ?? 24;

  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={{ flex: 1, backgroundColor: '#FEFEFE' }}
    >
      <KeyboardAvoidingView behavior="position">
        <Image
          style={[
            styles.image,
            { width: imageSize, height: imageSize, marginTop },
          ]}
          source={AppImages.feedbackImage}
          resizeMode="cover"
        />
        <Text style={styles.title}>Your FeedBack</Text>
        <Text style={styles.subTitle}>
          Give your best time for this moment.
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your feedback..."
            placeholderTextColor="#313A44"
            multiline
          />
        </View>

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
      <View
        style={{
          position: 'absolute',
          padding: 8,
          left: 8,
          backgroundColor: 'white',
        }}
      >
        <Pressable
          style={({ pressed }) => [
            {
              marginTop: marginTop + 8,
              opacity: !Config.isAndroid && pressed ? 0.4 : 1,
            },
          ]}
          onPress={() => navigation.openDrawer()}
          android_ripple={{ color: 'grey', radius: 20, borderless: true }}
        >
          <Icon name="menu" size={25} color="black" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    // paddingHorizontal: 16,
    // width: undefined,
    // height: 320,
    backgroundColor: '#FEFEFE',
    alignSelf: 'center',
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
  inputContainer: {
    minHeight: 80,
    maxHeight: 160,
    marginTop: 16,
    marginHorizontal: 32,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 8,
    shadowColor: 'rgba(158, 158, 158, 0.8)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  input: {
    height: 48,
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
