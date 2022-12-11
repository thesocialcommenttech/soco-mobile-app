import EventEmitter from 'eventemitter3';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useInterestData } from '~/src/state/InterestSelectorState';
import { CategoryChipProps } from '../categoryBox';
import CategoryBox from '../categoryBox';

export const InterestCategory = memo(function (props: {
  hide?: boolean;
  _id: string;
  CategoryChipProps: CategoryChipProps;
}) {
  const [hide, setHide] = useState(props.hide ?? false);
  const [_, { events, getStore }] = useInterestData(() => null);
  const unselectListner = useRef<() => EventEmitter>();
  const selectionActive = useRef(getStore().availableSelection > 0);

  const interestUnselected = () => {
    setHide(false);
  };

  const onSelectionCountUpdated = ([active]) => {
    selectionActive.current = active;
  };

  useEffect(() => {
    const selectionListner = events.listen(
      'interest-selection-toggle',
      onSelectionCountUpdated
    );

    if (getStore().selectedCategories.find(cat => cat._id === props._id)) {
      setHide(true);
    }

    return () => {
      selectionListner();
      unselectListner.current?.();
    };
  }, []);

  useEffect(() => {
    if (hide) {
      unselectListner.current = events.listenOnce(
        `unselect:${props._id}`,
        interestUnselected
      );
    }
  }, [hide]);

  if (hide) {
    return null;
  }

  return (
    <CategoryBox
      {...props.CategoryChipProps}
      onPress={
        props.CategoryChipProps?.onPress &&
        (() => {
          if (selectionActive.current) {
            props.CategoryChipProps?.onPress?.();
            setHide(true);
          }
        })
      }
    />
  );
});
