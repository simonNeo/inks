import { Box, BoxProps, useInput } from "ink";
import React, { useCallback, useState, useMemo, useEffect } from "react";

/**
 * Props for the ScrollBox component
 */
export interface ScrollBoxProps<T> extends BoxProps {
  /** Maximum number of rows to render at once */
  maxRows: number;
  /** Array of data items to display */
  list: T[];
  /** 
   * Render function for each item. Must render a single row.
   * @param item - The current item from the list
   * @param isActive - Whether this item is currently active/selected (only in 'item' scroll mode)
   */
  renderItem: (item: T, isActive: boolean) => React.ReactNode;
  /** Whether scrolling is enabled. When true, arrow keys will be listened to */
  enableScroll: boolean;
  /** 
   * Scroll mode: 'item' for item-by-item scrolling, 'page' for page-by-page scrolling
   * @default 'item'
   */
  scrollMode?: 'item' | 'page';
  /** 
   * Callback function called when scroll state changes
   * @param result - Object containing current data, index, and visible range
   */
  onChange?: (result: { data?: T; index: number; startIndex: number; endIndex: number }) => void;
}

/**
 * ScrollBox - A scrollable container component for Ink CLI applications
 * 
 * This component renders a scrollable list of items with support for both
 * item-by-item and page-by-page scrolling modes. It efficiently renders only
 * the visible items to optimize performance.
 * 
 * @param props - ScrollBox component props
 */
export function ScrollBox<T>(props: ScrollBoxProps<T>) {
  const { maxRows, list, renderItem, enableScroll, scrollMode = 'item', onChange, ...rest } = props;
  
  /** Current selected index (only used in 'item' scroll mode) */
  const [index, setIndex] = useState(0);
  /** Starting index of the visible data range */
  const [startIndex, setStartIndex] = useState(0);

  /**
   * Calculate the visible range based on startIndex and maxRows
   * Ensures we don't exceed the list length
   */
  const visibleRange = useMemo(() => {
    const endIndex = Math.min(startIndex + maxRows, list.length);
    return { start: startIndex, end: endIndex };
  }, [startIndex, maxRows, list.length]);

  /**
   * Get the currently visible data slice from the list
   */
  const visibleData = useMemo(() => {
    return list.slice(visibleRange.start, visibleRange.end);
  }, [list, visibleRange.start, visibleRange.end]);

  /**
   * Trigger onChange callback when scroll state changes
   * Only provides data in 'item' scroll mode when a valid item is selected
   */
  useEffect(() => {
    if (!onChange) return;

    const result = {
      data: scrollMode === 'item' && index >= 0 && index < list.length ? list[index] : undefined,
      index,
      startIndex: visibleRange.start,
      endIndex: visibleRange.end,
    };
    onChange(result);
  }, [index, visibleRange.start, visibleRange.end, scrollMode, list, onChange]);

  /**
   * Handle scroll actions (up or down)
   * Supports two scroll modes:
   * - 'page': Scrolls by page (maxRows items at a time)
   * - 'item': Scrolls item by item, maintaining selection
   * 
   * @param dir - Scroll direction: 'up' or 'down'
   */
  const handleScroll = useCallback((dir: 'up' | 'down') => {
    if (scrollMode === 'page') {
      // Page scroll mode: scroll by maxRows items at a time
      if (dir === 'down') {
        // Scroll down one page: new start position is current end index
        const currentEndIndex = visibleRange.end;
        if (currentEndIndex < list.length) {
          // New start position begins from the current end index
          const newStartIndex = currentEndIndex;
          // If new start + maxRows exceeds list length, adjust to list.length - maxRows
          const finalStartIndex = newStartIndex + maxRows > list.length
            ? Math.max(0, list.length - maxRows)
            : newStartIndex;
          setStartIndex(finalStartIndex);
          // In page mode, set index to the first visible item of the new page
          setIndex(finalStartIndex);
        }
      } else {
        // Scroll up one page: new start position is current start minus maxRows
        const newStartIndex = startIndex - maxRows;
        if (newStartIndex >= 0) {
          setStartIndex(newStartIndex);
          // In page mode, set index to the first visible item of the new page
          setIndex(newStartIndex);
        } else {
          // If less than 0, go back to the first page
          setStartIndex(0);
          setIndex(0);
        }
      }
    } else {
      // Item-by-item scroll mode
      if (dir === 'down') {
        // Scroll down one item
        if (index < list.length - 1) {
          const newIndex = index + 1;
          // Check if new index is within visible range
          if (newIndex < visibleRange.end) {
            // Within visible range, only update index
            setIndex(newIndex);
          } else {
            // Outside visible range, need to scroll
            // New index should be at the last position of visible range
            const newStartIndex = newIndex - maxRows + 1;
            setStartIndex(Math.max(0, newStartIndex));
            setIndex(newIndex);
          }
        }
        // If already at the last item, do nothing
      } else {
        // Scroll up one item
        if (index > 0) {
          const newIndex = index - 1;
          // Check if new index is within visible range
          if (newIndex >= visibleRange.start) {
            // Within visible range, only update index
            setIndex(newIndex);
          } else {
            // Before visible range, need to scroll
            // New index should be at the first position of visible range
            setStartIndex(newIndex);
            setIndex(newIndex);
          }
        }
        // If already at the first item, do nothing
      }
    }
  }, [index, list.length, visibleRange, maxRows, scrollMode, startIndex]);

  /**
   * Handle keyboard input for scrolling
   * Listens to arrow keys and 'up'/'down' input when enableScroll is true
   */
  useInput((input, key) => {
    if (!enableScroll) {
      return;
    }
    if (input === 'up' || key.upArrow) {
      handleScroll('up');
    }
    if (input === 'down' || key.downArrow) {
      handleScroll('down');
    }
  });

  /**
   * Render the visible items
   * Only renders items within the visible range for performance
   */
  return (
    <Box flexDirection="column" {...rest}>
      {visibleData.map((item, i) => {
        // Calculate the actual index in the original list
        const actualIndex = visibleRange.start + i;
        // Only mark as active in 'item' scroll mode when it matches current index
        const isActive = props.scrollMode === 'item' ? actualIndex === index : false;
        return (
          <Box key={actualIndex}>
            {renderItem(item, isActive)}
          </Box>
        );
      })}
    </Box>
  );
}
const MemoizedScrollBox = React.memo(ScrollBox) as <T>(
  props: ScrollBoxProps<T>
) => React.ReactElement;

export default MemoizedScrollBox;
