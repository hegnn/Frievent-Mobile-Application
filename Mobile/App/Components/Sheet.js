import React, {Component} from 'react';
import {View, Animated, StyleSheet, TouchableOpacity, Text} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {ScreenSize} from '../utility/Consts';
class Sheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
    this.bottomSheetRef = React.createRef();
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 300,
    }).start(() => {
      this.bottomSheetRef?.current?.snapToIndex(0);
    });
  }

  onClose = () => {
    this.bottomSheetRef?.current?.snapToIndex(-1);
  };

  handleSheetChanges = index => {
    if (index === -1) {
      Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration: 150,
      }).start(() => {
        this.bottomSheetRef.current.close();
        this.props.onClose && this.props.onClose();
      });
    }
  };

  render() {
    const {title, children, height} = this.props;
    const {fadeAnim} = this.state;
    const snapPoints = [height];

    return (
      <Animated.View style={styles(fadeAnim).animatedContainer}>
        <BottomSheet
          ref={this.bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose
          onChange={this.handleSheetChanges}>
          <View style={styles().sheetContainer}>
            <View style={styles().titleContainer}>
              <Text style={{fontWeight: 'bold', fontSize: '24'}}>{title}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.onClose();
              }}
              style={styles().button}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>

          <View style={styles().childrenContainer}>{children && children}</View>
        </BottomSheet>
      </Animated.View>
    );
  }
}

const styles = (TitleIcon, fadeAnim) =>
  StyleSheet.create({
    animatedContainer: {
      flex: 1,
      width: ScreenSize.width,
      height: ScreenSize.height,
      backgroundColor: 'rgba(0,0,0,.4)',
      position: 'absolute',
      zIndex: 99999,
      opacity: fadeAnim,
    },
    sheetContainer: {
      flexDirection: 'row',
      marginTop: 0,
      marginBottom: 5,
    },
    titleContainer: {
      flex: 1,
      paddingLeft: 25,
      paddingRight: 25,
    },
    button: {
      width: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
    childrenContainer: {
      paddingHorizontal: 33,
      flex: 1,
      paddingTop: 25,
    },
  });

export default Sheet;
