package com.example.scrollwebviewdemon;

import android.content.Context;
import android.os.SystemClock;
import android.util.AttributeSet;
import android.util.Log;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.view.View;
import android.widget.ScrollView;

public class CustomScrollView1 extends ScrollView {
    private float mXDis, mYDis, mLastX, mLastY, mCurX, mCurY;
    private boolean mInterceptFlag = true;
    private boolean mFlagChanged = false;

    private int mDirecton = 0;
    private float mVelocityY = 0f;
    private GestureDetector mGd;
    private OnScrollViewScrollListener mListener;

    GestureDetector.SimpleOnGestureListener mGesGestureListener = new GestureDetector.SimpleOnGestureListener() {

        public boolean onScroll(MotionEvent e1, MotionEvent e2,
                float distanceX, float distanceY) {
            if (distanceY > 0) {
                // 手指向上
                mDirecton = 1;
            } else if (distanceY < 0) {
                mDirecton = -1;
            }
            return false;
        }

        public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX,
                float velocityY) {
            Log.e("onFling", String.format("velocity (%f,%f) -%b", velocityX,
                    velocityY, mFlagChanged));
            mVelocityY = velocityY;
            return false;
        }
    };

    public int getVelocity() {
        return (int) mVelocityY;
    }

    public void setInterceptFlag(boolean flag) {
        if (mInterceptFlag != flag) {
            Log.e("setInterceptFlag",
                    String.format("%b to %b", mInterceptFlag, flag));
            mInterceptFlag = flag;
            mFlagChanged = true;
        }
    }

    public CustomScrollView1(Context context) {
        super(context);
        init();
    }

    public CustomScrollView1(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public CustomScrollView1(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init();
    }

    public void init() {
        mGd = new GestureDetector(getContext(), mGesGestureListener);
        setOverScrollMode(OVER_SCROLL_NEVER);
    }

    public void generateFakeTouchEvent(View view, float x, float y) {
        long downTime = SystemClock.uptimeMillis();
        long eventTime = SystemClock.uptimeMillis();
        MotionEvent motionEvent = MotionEvent.obtain(downTime, eventTime,
                MotionEvent.ACTION_CANCEL, x, y, 0);
        view.dispatchTouchEvent(motionEvent);

        downTime = SystemClock.uptimeMillis();
        eventTime = SystemClock.uptimeMillis();
        motionEvent = MotionEvent.obtain(downTime, eventTime,
                MotionEvent.ACTION_DOWN, x, y, 0);
        view.dispatchTouchEvent(motionEvent);
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {
        if (mInterceptFlag) {
            // fix 在listview应该处理事件的情况下，viewpager左右滑动不畅的情况。
            switch (ev.getActionMasked()) {
            case MotionEvent.ACTION_DOWN:
                mXDis = mYDis = 0f;
                mLastX = ev.getX();
                mLastY = ev.getY();
                break;
            case MotionEvent.ACTION_MOVE:
                mCurX = ev.getX();
                mCurY = ev.getY();
                mXDis += Math.abs(mCurX - mLastX);
                mYDis += Math.abs(mCurY - mLastY);
                mLastX = mCurX;
                mLastY = mCurY;
                if (mXDis > mYDis)
                    return false;
            }
            return super.onInterceptTouchEvent(ev);
        }
        return false;
    }

    public boolean dispatchTouchEvent(MotionEvent event) {
        if (event.getActionMasked() == MotionEvent.ACTION_MOVE) {
            if (mFlagChanged) {
                mFlagChanged = false;
                generateFakeTouchEvent(CustomScrollView1.this, event.getX(),
                        event.getY());
            }
        }
        mGd.onTouchEvent(event);
        return super.dispatchTouchEvent(event);
    }

    @Override
    public void onOverScrolled(int scrollX, int scrollY, boolean clampedX,
            boolean clampedY) {
        super.onOverScrolled(scrollX, scrollY, clampedX, clampedY);
        if (mListener != null) {
            // Log.e("scrollview onOverScrolled-------", String.format(
            // "(%d,%d) (%b,%b) direction:%d", scrollX, scrollY, clampedX,
            // clampedY, mDirecton));

            mListener.onScroll(scrollX, scrollY, clampedX, clampedY, mDirecton);
        }
    }

    public void setOnScrollViewScrollListener(
            OnScrollViewScrollListener listener) {
        mListener = listener;
    }

    public interface OnScrollViewScrollListener {
        // direction>0 是指 手指向上滑动。
        public void onScroll(int scrollX, int scrollY, boolean clampedX,
                boolean clampedY, int direction);
    }

}
