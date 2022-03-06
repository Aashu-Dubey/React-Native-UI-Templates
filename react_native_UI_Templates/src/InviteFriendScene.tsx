import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
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

const InviteFriendScene: React.FC<Props> = () => {
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
        source={AppImages.inviteImage}
        resizeMode="cover"
      />
      <Text style={styles.title}>Invite Your Friends</Text>
      <Text style={styles.subTitle}>
        Are you one of those who makes everything{'\n'} at the last moment?
      </Text>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { opacity: !Config.isAndroid && pressed ? 0.4 : 1 },
          ]}
          android_ripple={{ color: 'grey' }}
        >
          <Icon name="share" size={25} color="white" />
          <Text style={styles.buttonText}>Share</Text>
        </Pressable>
      </View>
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
          onPress={() => navigation.toggleDrawer()}
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
    flexDirection: 'row',
    width: 140,
    height: 40,
    padding: 8,
    backgroundColor: 'dodgerblue',
    borderRadius: 4,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    padding: 4,
  },
});

export default InviteFriendScene;
