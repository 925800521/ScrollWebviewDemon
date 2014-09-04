package com.example.scrollwebviewdemon;

import android.content.Context;
import android.os.SystemClock;
import android.util.AttributeSet;
import android.util.Log;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.view.View;

import com.example.scrollwebviewdemon.view.XListView;

public class CustomListView extends XListView {
    private boolean mInterceptTouchEventFlag = true;
    private boolean mChangedFlag = false;

    private float mXDis, mYDis, mLastX, mLastY, mCurX, mCurY;
    private GestureDetector mGd;
    public float mVelocityY;

    public CustomListView(Context context) {
        super(context);
        mGd = new GestureDetector(getContext(), mGesGestureListener);
    }

    public CustomListView(Context context, AttributeSet attrs) {
        super(context, attrs);
        mGd = new GestureDetector(getContext(), mGesGestureListener);
    }

    public CustomListView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        mGd = new GestureDetector(getContext(), mGesGestureListener);
    }

    GestureDetector.SimpleOnGestureListener mGesGestureListener = new GestureDetector.SimpleOnGestureListener() {
        public boolean onDown(MotionEvent event) {
            return false;
        }

        public boolean onFling(MotionEvent event1, MotionEvent event2,
                float velocityX, float velocityY) {
            mVelocityY = velocityY;
            return false;
        }

    };

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        mGd.onTouchEvent(event);
        return super.onTouchEvent(event);
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

    public void setInterceptTouchEventFlag(boolean flag) {
        Log.e("setInterceptTouchEventFlag", "flag:" + flag);
        if (mInterceptTouchEventFlag != flag) {
            mInterceptTouchEventFlag = flag;
            mChangedFlag = true;
        }
    }

    public boolean getInterceptTouchEventFlag() {
        return mInterceptTouchEventFlag;
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {
        if (mInterceptTouchEventFlag) {
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
        } else {
            return false;
        }
    }

    @Override
    public boolean dispatchTouchEvent(MotionEvent event) {
        if (event.getActionMasked() == MotionEvent.ACTION_MOVE) {
            if (mChangedFlag) {
                mChangedFlag = false;
                generateFakeTouchEvent(CustomListView.this, event.getX(),
                        event.getY());
            }
        }
        return super.dispatchTouchEvent(event);
    }

}
