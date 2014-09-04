package com.example.scrollwebviewdemon;

import android.content.Context;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.webkit.WebView;

public class CustomWebView extends WebView {
    private OnScrollTopListener mOnScrollTopListener = null;

    public CustomWebView(Context context) {
        super(context);
    }

    public CustomWebView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public CustomWebView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    public void setOnScrollTopListener(OnScrollTopListener listener) {
        mOnScrollTopListener = listener;
    }

    @Override
    protected void onScrollChanged(int l, int t, int oldl, int oldt) {
        super.onScrollChanged(l, t, oldl, oldt);
        if (mOnScrollTopListener != null && getScrollY() <= 0
                && getScrollY() > -2) {
            mOnScrollTopListener.onScrollTop();
        }
    }

    public void fixAfterViewPagerSwipe() {
        onScrollChanged(getScrollX(), getScrollY(), getScrollX(), getScrollY());
    }

    public interface OnScrollTopListener {
        public void onScrollTop();
    }
}
