import React from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Linking,
  StyleSheet
} from 'react-native';
import { hasParents, RenderRules } from 'react-native-markdown-display';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Black } from '~/src/utils/colors';
import textStyleProps from 'react-native-markdown-display/src/lib/data/textStyleProps';
import Video from '../theme/Video';
import Thumbnail from '../theme/Thumbnail';

export default {
  ins: (node, children, parent, style) => {
    return (
      <Text key={node.key} style={style.insert}>
        {children}
      </Text>
    );
  },
  paragraph: (node, children, parent, styles) => {
    let modifiedStyle = [styles._VIEW_SAFE_paragraph];
    if (parent[0].type === 'body') {
      const prevEl = parent[0].children[node.index - 1];

      if (prevEl && prevEl.type === 'paragraph') {
        modifiedStyle.push(styles.paragraph_before_paragaraph);
      }
    }

    return (
      <View key={node.key} style={modifiedStyle}>
        {children}
      </View>
    );
  },
  sup: (node, children, parent, style) => {
    return (
      <View key={node.key} style={style.sup}>
        {children}
      </View>
    );
  },
  sub: (node, children, parent, style) => {
    return (
      <View key={node.key} style={style.sub}>
        {children}
      </View>
    );
  },
  blocklink: (node, children, parent, styles) => {
    return (
      <TouchableWithoutFeedback
        key={node.key}
        onPress={() => {
          if (Linking.canOpenURL(node.attributes.href)) {
            Linking.openURL(node.attributes.href);
          }
        }}
      >
        <>{children}</>
      </TouchableWithoutFeedback>
    );
  },
  link: (node, children, parent, style) => {
    return (
      <Text
        key={node.key}
        style={style.link}
        onPress={() => {
          if (Linking.canOpenURL(node.attributes.href)) {
            Linking.openURL(node.attributes.href);
          }
        }}
      >
        {children}
      </Text>
    );
  },
  list_item: (node, children, parent, styles, inheritedStyles = {}) => {
    const refStyle = {
      ...inheritedStyles,
      ...StyleSheet.flatten(styles.list_item)
    };

    const arr = Object.keys(refStyle);

    const modifiedInheritedStylesObj = {};

    for (let b = 0; b < arr.length; b++) {
      if (textStyleProps.includes(arr[b])) {
        modifiedInheritedStylesObj[arr[b]] = refStyle[arr[b]];
      }
    }

    if (hasParents(parent, 'bullet_list')) {
      return (
        <View key={node.key} style={styles._VIEW_SAFE_list_item}>
          <View style={styles.bullet_list_icon} />
          <View style={styles._VIEW_SAFE_bullet_list_content}>{children}</View>
        </View>
      );
    }

    if (hasParents(parent, 'ordered_list')) {
      const orderedListIndex = parent.findIndex(
        el => el.type === 'ordered_list'
      );

      const orderedList = parent[orderedListIndex];
      let listItemNumber;

      if (orderedList.attributes && orderedList.attributes.start) {
        listItemNumber = orderedList.attributes.start + node.index;
      } else {
        listItemNumber = node.index + 1;
      }

      return (
        <View key={node.key} style={styles._VIEW_SAFE_list_item}>
          <Text style={[modifiedInheritedStylesObj, styles.ordered_list_icon]}>
            {listItemNumber}
            {node.markup}
          </Text>
          <View style={styles._VIEW_SAFE_ordered_list_content}>{children}</View>
        </View>
      );
    }

    // we should not need this, but just in case
    return (
      <View key={node.key} style={styles._VIEW_SAFE_list_item}>
        {children}
      </View>
    );
  },
  image: (
    node,
    children,
    parentNode,
    styles,
    allowedHandler,
    defaultHandler
  ) => (
    <Thumbnail
      key={node.key}
      calculateWidth={winWidth => winWidth - 30}
      imageProps={{ source: { uri: node.attributes.src }, style: styles.image }}
    />
  ),
  video: (
    node,
    children,
    parentNode,
    styles,
    allowedHandler,
    defaultHandler
  ) => (
    <Video
      key={node.key}
      calculateWidth={winW => winW - 30}
      style={{ borderRadius: 10, flex: -1 }}
      source={{ uri: node.attributes.src }}
    />
  ),
  text: (node, children, parent, style, styleObj) => {
    return (
      <Text key={node.key} style={[style.text, styleObj]}>
        {node.content}
      </Text>
    );
  },
  textgroup: (node, children, parent, styles) => {
    return (
      <Text key={node.key} style={styles.textgroup}>
        {children}
      </Text>
    );
  },
  blockquote: (node, children) => {
    let text = node.children[0].children[0].children[0].content;

    if (node.children[0].children[0].children[0].type !== 'text') {
      let child = node.children[0].children[0].children[0];
      while (child.type !== 'text') {
        child = child.children[0];
      }

      text = child.content;
    }

    return (
      <View key={node.key} style={{ flexDirection: 'row', marginVertical: 20 }}>
        <MaterialCommunityIcons
          name="comma"
          size={24}
          style={{
            marginRight: 10,
            marginTop: 5,
            color: Black[500]
          }}
        />
        <Text
          style={{
            fontSize: 16,
            color: Black[800],
            flexWrap: 'wrap',
            fontFamily: 'Roboto-Light',
            flex: 1,
            lineHeight: 25
          }}
        >
          {text}
        </Text>
      </View>
    );
  }
} as RenderRules;
