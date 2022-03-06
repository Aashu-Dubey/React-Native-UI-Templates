import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Platform,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppImages } from '../res';
import Config from './Config';

interface Props {}

const HelpScene: React.FC<Props> = () => {
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
      <Image
        style={[
          styles.image,
          { width: imageSize, height: imageSize, marginTop },
        ]}
        source={AppImages.helpImage}
        resizeMode="cover"
      />
      <Text style={styles.title}>How can we help you?</Text>
      <Text style={styles.subTitle}>
        It looks like you are experiencing problems{'\n'}with our sign up
        process. We are here to{'\n'}help so please get in touch with us
      </Text>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { opacity: !Config.isAndroid && pressed ? 0.4 : 1 },
          ]}
          android_ripple={{ color: 'grey' }}
        >
          <Text style={styles.buttonText}>Chat with Us</Text>
        </Pressable>
      </View>
      {/* <View style={{ flexDirection: 'row', padding: 8, paddingBottom: 0 }}> */}
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
  button: {
    width: 140,
    height: 40,
    padding: 8,
    backgroundColor: 'dodgerblue',
    borderRadius: 4,
    elevation: 8,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    padding: 4,
  },
});

export default HelpScene;
