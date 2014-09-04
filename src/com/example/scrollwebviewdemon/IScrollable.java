package com.example.scrollwebviewdemon;

public interface IScrollable {
    // direction>0 是指 屏幕向左,手指向右滑动
    boolean canScrollX(int direction);

    // direction>0 是指 屏幕向上,手指向下滑动
    boolean canScrollV(int direction);
}
