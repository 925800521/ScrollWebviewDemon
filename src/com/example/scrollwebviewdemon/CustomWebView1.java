package com.example.scrollwebviewdemon;

import android.content.Context;
import android.util.AttributeSet;
import android.util.Log;
import android.webkit.WebView;

public class CustomWebView1 extends WebView {
    private float mYpos = 0f;
    private OnWebViewScrollListener mListener;

    public CustomWebView1(Context context) {
        super(context);
        init();
    }

    public CustomWebView1(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public CustomWebView1(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init();
    }

    public void init() {
        setOverScrollMode(OVER_SCROLL_NEVER);
    }

    // @Override
    // public boolean canScrollX(int direction) {
    // return false;
    // }
    //
    // @Override
    // public boolean canScrollV(int direction) {
    // // direction>0 是指 屏幕向上滑动。
    // // Log.e("web canScrollV",
    // // String.format(
    // //
    // "computeVerticalScrollOffset:%d,computeVerticalScrollRange:%d,computeVerticalScrollExtent:%d -%d-%d-%d-%f-%d",
    // // computeVerticalScrollOffset(),
    // // computeVerticalScrollRange(),
    // // computeVerticalScrollExtent(), this.getContentHeight(),
    // // this.getMeasuredHeight(), this.getHeight(),
    // // this.getScale(), this.getScrollY()));
    // final int offset = computeVerticalScrollOffset();
    // final int range = computeVerticalScrollRange()
    // - computeVerticalScrollExtent();
    // if (range == 0)
    // return false;
    // if (direction < 0) {
    // return offset > 0;
    // } else {
    // return offset < range - 1;
    // }
    // }

    @Override
    public void onOverScrolled(int scrollX, int scrollY, boolean clampedX,
            boolean clampedY) {
        super.onOverScrolled(scrollX, scrollY, clampedX, clampedY);

        if (mListener != null) {
            int direction = 0;
            if (scrollY - mYpos > 0) {
                // 手指向上
                direction = 1;
            } else if (scrollY - mYpos < 0) {
                direction = -1;
            }
            mYpos = scrollY;

            // Log.e("webview onOverScrolled-------", String.format(
            // "(%d,%d) (%b,%b) direction:%d", scrollX, scrollY, clampedX,
            // clampedY, mDirection));
            mListener.onScroll(scrollX, scrollY, clampedX, clampedY, direction);
        }
    }

    public void setOnWebViewScrollListener(OnWebViewScrollListener listener) {
        mListener = listener;
    }

    // @Override
    // protected void onScrollChanged(int x, int y, int oldX, int oldY) {
    // Log.e("onScrollChanged",
    // String.format("(%d,%d) (%d,%d)", x, y, oldX, oldY));
    // super.onScrollChanged(x, y, oldX, oldY);
    // }

    public void fixAfterViewPagerSwipe() {
        onScrollChanged(getScrollX(), getScrollY(), getScrollX(), getScrollY());
    }

    public interface OnWebViewScrollListener {
        // direction>0 是指 手指向上滑动。
        public void onScroll(int scrollX, int scrollY, boolean clampedX,
                boolean clampedY, int direction);
    }
}
