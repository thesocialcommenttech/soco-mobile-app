import {
  Dimensions,
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Markdown, {
  MarkdownIt,
  stringToTokens,
  tokensToAST
} from 'react-native-markdown-display';
import { Black } from '~/src/utils/colors';
import defaultConverters from 'quill-delta-to-markdown/src/fromDelta.converters';
import MDIns from 'markdown-it-ins';
import MDSub from 'markdown-it-sub';
import MDSup from 'markdown-it-sup';
import { html5Media } from 'markdown-it-html5-media';
import { cleanupTokens } from 'react-native-markdown-display/src/lib/util/cleanupTokens';
import Node from 'quill-delta-to-markdown/src/utils/Node';
import { encodeLink } from 'quill-delta-to-markdown/src/utils/URL';
import { deltaToMarkdown } from 'quill-delta-to-markdown';
import markdownStyle from './styles';
import renderRules from './renderRules';
import Skeleton from '../theme/Skeleton';

export type MarkdownString = string;

type EditorViewProps = {
  value: any[];
  style?: ViewStyle;
  loading?: boolean;
};

defaultConverters.embed.video = function (src) {
  this.append(`![](${encodeLink(src)})`);
};

defaultConverters.inline.strike = function (src) {
  return ['~~', '~~'];
};

defaultConverters.inline.underline = function (src) {
  return ['++', '++'];
};

defaultConverters.block['code-block'] = {
  group: function () {
    return new Node(['``` ', '```\n']);
  },
  line: function (attrs, group) {}
};

defaultConverters.inline.script = function (src) {
  if (src === 'sub') {
    return ['~', '~'];
  } else {
    return ['^', '^'];
  }
};

defaultConverters.block.blockquote = {
  group: function () {
    return new Node(['> ', '\n']);
  },
  line: function (attrs, group) {}
};

const EditorView = (props: EditorViewProps) => {
  const markdownItInstance = useRef(
    MarkdownIt({ typographer: true, breaks: true })
      .use(html5Media)
      .use(MDIns)
      .use(MDSub)
      .use(MDSup)
  );

  const value = useMemo(() => {
    if (props?.value) {
      const mkd = deltaToMarkdown(props?.value, defaultConverters);

      // let tokens = stringToTokens(mkd, markdownItInstance.current);
      // tokens = cleanupTokens(tokens);
      // tokens = groupTextTokens(tokens);
      // const astTree = tokensToAST(tokens);

      return props?.value && mkd;
    }
  }, [props?.value]);

  if (props.loading) {
    return (
      <View style={{}}>
        <Skeleton height={16} width={100} style={{ marginTop: 10 }} />
        <Skeleton height={16} width={150} style={{ marginTop: 10 }} />
        <Skeleton height={16} width={180} style={{ marginTop: 10 }} />
      </View>
    );
  }

  return (
    <Markdown
      markdownit={markdownItInstance.current}
      style={{ ...markdownStyle, body: { ...markdownStyle, ...props.style } }}
      rules={renderRules}
    >
      {value}
    </Markdown>
  );
};

export default EditorView;

const styles = StyleSheet.create({});
