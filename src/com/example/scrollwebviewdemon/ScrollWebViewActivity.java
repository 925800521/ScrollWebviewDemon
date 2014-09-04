package com.example.scrollwebviewdemon;

import java.util.ArrayList;
import java.util.List;

import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v4.view.ViewPager.OnPageChangeListener;
import android.support.v7.app.ActionBarActivity;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.view.ViewTreeObserver;
import android.view.ViewTreeObserver.OnGlobalLayoutListener;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.scrollwebviewdemon.CustomScrollView.OnScrollListener;
import com.example.scrollwebviewdemon.CustomWebView.OnScrollTopListener;

public class ScrollWebViewActivity extends ActionBarActivity implements
        OnClickListener {
    private static final String TAG = "WebViewActivity";
    private ViewPager mPager;
    private LinearLayout mMenu;
    private LinearLayout mLayout;
    private CustomScrollView mScrollView;
    private TextView mTab1;
    private TextView mTab2;
    private TextView mTab3;
    private PagerAdapter mPagerAdapter;
    private int mStickerPos = 0;

    private boolean mIsScrollManually = false;

    private OnScrollTopListener mWebViewListener = new OnScrollTopListener() {
        @Override
        public void onScrollTop() {
            if (!mScrollView.getInterceptTouchEventFlag()) {
                Log.e("onScrollTop", "setInterceptTouchEventFlag");
                mScrollView.setInterceptTouchEventFlag(true);
                fixWebViewContentTruncate();

                // fix onScrollTop之后，listview 负责处理事件后，webview不能再下拉的情况
                mScrollView.scrollBy(0, 1);
                mIsScrollManually = true;

            }
        }
    };

    private OnGlobalLayoutListener mGlobalLayoutListener = new OnGlobalLayoutListener() {
        public void onGlobalLayout() {

            int[] location = new int[2];
            mScrollView.getLocationOnScreen(location);
            mStickerPos = location[1];

            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT,
                    LinearLayout.LayoutParams.MATCH_PARENT);
            DisplayMetrics dm = new DisplayMetrics();
            getWindowManager().getDefaultDisplay().getMetrics(dm);

            params.height = dm.heightPixels
                    - location[1]
                    - getResources().getDimensionPixelSize(
                            R.dimen.tab_menu_height);
            mPager.setLayoutParams(params);

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
                mPager.getViewTreeObserver().removeOnGlobalLayoutListener(this);
            } else {
                mPager.getViewTreeObserver().removeGlobalOnLayoutListener(this);
            }
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_scrollwebview);
        init();
    }

    public void init() {
        mMenu = (LinearLayout) findViewById(R.id.tab_group);
        mLayout = (LinearLayout) findViewById(R.id.main_page);
        mScrollView = (CustomScrollView) findViewById(R.id.scroll_view);

        mScrollView.setOnScrollListener(new OnScrollListener() {

            @Override
            public void onScroll(MotionEvent event1, MotionEvent event2,
                    float xDis, float yDis) {

                if (mIsScrollManually) {
                    mIsScrollManually = false;
                    // 忽略手动scroll
                    return;
                }

                int[] location = new int[2];
                mMenu.getLocationOnScreen(location);

                Log.e("*********",
                        String.format("locationY %d - ", location[1]));
                if (location[1] == mStickerPos) {
                    if (mScrollView.getInterceptTouchEventFlag()) {
                        mScrollView.setInterceptTouchEventFlag(false);
                        // fix webview.onscrollchanged 不被调用的问题
                        CustomWebView v = ((WebAdapter) mPagerAdapter)
                                .getWebView(mPager.getCurrentItem());
                        Log.e("*********", String.format("flingScroll (%d,%d)",
                                0, (int) mScrollView.mVelocityY));
                        if (mScrollView.mVelocityY != 0) {
                            v.flingScroll(0,
                                    Math.abs((int) mScrollView.mVelocityY));
                            mScrollView.mVelocityY = 0;
                        } else {
                            v.scrollTo(0, v.getScrollY() + 1);
                        }
                    }
                }

                // if (location[1] > mStickerPos) {
                // // if (mScrollView.getScrollY() < mHeaderHeight) {
                // if (!mScrollView.getInterceptTouchEventFlag()) {
                // mScrollView.setInterceptTouchEventFlag(true);
                // fixWebViewContentTruncate();
                // }
                // } else {
                // if (mScrollView.getInterceptTouchEventFlag()) {
                // mScrollView.setInterceptTouchEventFlag(false);
                // // fix webview.onscrollchanged 不被调用的问题
                // CustomWebView v = ((WebAdapter) mPagerAdapter)
                // .getWebView(mPager.getCurrentItem());
                // Log.e("*********", String.format("flingScroll (%d,%d)",
                // 0, (int) mScrollView.mVelocityY));
                // if (mScrollView.mVelocityY != 0) {
                // v.flingScroll(0,
                // Math.abs((int) mScrollView.mVelocityY));
                // mScrollView.mVelocityY = 0;
                // } else {
                // v.scrollTo(0, v.getScrollY() + 1);
                // }
                // }
                // }
            }
        });

        mTab1 = (TextView) findViewById(R.id.tab1);
        mTab2 = (TextView) findViewById(R.id.tab2);
        mTab3 = (TextView) findViewById(R.id.tab3);
        mTab1.setOnClickListener(this);
        mTab2.setOnClickListener(this);
        mTab3.setOnClickListener(this);

        List<CustomWebView> views = new ArrayList<CustomWebView>();

        View v1 = getLayoutInflater().inflate(R.layout.webview, null);
        View v2 = getLayoutInflater().inflate(R.layout.webview, null);
        View v3 = getLayoutInflater().inflate(R.layout.webview, null);

        CustomWebView webView1 = (CustomWebView) v1.findViewById(R.id.webview);
        webView1.getSettings().setJavaScriptEnabled(true);
        webView1.setOnScrollTopListener(mWebViewListener);
        webView1.loadUrl("file:///android_asset/list.html");
        webView1.setLayerType(View.LAYER_TYPE_SOFTWARE, null);

        CustomWebView webView2 = (CustomWebView) v2.findViewById(R.id.webview);
        webView2.getSettings().setJavaScriptEnabled(true);
        webView2.loadUrl("file:///android_asset/list.html");
        webView2.setOnScrollTopListener(mWebViewListener);
        webView2.setLayerType(View.LAYER_TYPE_SOFTWARE, null);

        CustomWebView webView3 = (CustomWebView) v3.findViewById(R.id.webview);
        webView3.getSettings().setJavaScriptEnabled(true);
        webView3.loadUrl("http://a.9game.cn/category/hot/97_0_1.html");
        webView3.setOnScrollTopListener(mWebViewListener);
        webView3.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
        views.add(webView1);
        views.add(webView2);
        views.add(webView3);

        mPagerAdapter = new WebAdapter(views);
        mPager = (ViewPager) findViewById(R.id.view_pager);
        mPager.setAdapter(mPagerAdapter);
        mPager.setCurrentItem(0);
        changeTab(0);
        mPager.setOnPageChangeListener(new MyOnPageChangeListener());

        final ViewTreeObserver observer = mPager.getViewTreeObserver();
        if (observer != null && observer.isAlive()) {
            observer.addOnGlobalLayoutListener(mGlobalLayoutListener);
        }
    }

    public void fixWebViewContentTruncate() {
        // fix 当header view可见时，下部webview内容被截断（即开头内容被覆盖）的情况
        if (mPagerAdapter != null) {
            CustomWebView v = null;
            for (int i = 0; i < mPagerAdapter.getCount(); ++i) {
                v = ((WebAdapter) mPagerAdapter).getWebView(i);
                if (v.getScrollY() > 1) {
                    v.scrollTo(0, 1);
                }
            }
        }
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
        case R.id.tab1:
            mPager.setCurrentItem(0);
            break;
        case R.id.tab2:
            mPager.setCurrentItem(1);
            break;
        case R.id.tab3:
            mPager.setCurrentItem(2);
            break;

        default:
            break;
        }
    }

    public void changeTab(int position) {
        switch (position) {
        case 0:
            mTab1.setBackgroundColor(Color.GRAY);
            mTab2.setBackgroundColor(Color.WHITE);
            mTab3.setBackgroundColor(Color.WHITE);
            break;
        case 1:
            mTab1.setBackgroundColor(Color.WHITE);
            mTab2.setBackgroundColor(Color.GRAY);
            mTab3.setBackgroundColor(Color.WHITE);
            break;
        case 2:
            mTab1.setBackgroundColor(Color.WHITE);
            mTab2.setBackgroundColor(Color.WHITE);
            mTab3.setBackgroundColor(Color.GRAY);
            break;

        default:
            break;
        }
    }

    public class WebAdapter extends PagerAdapter {
        private List<CustomWebView> mListViews;

        public WebAdapter(List<CustomWebView> Views) {
            mListViews = Views;
        }

        @Override
        public int getCount() {
            return mListViews.size();
        }

        public CustomWebView getWebView(int pos) {
            return mListViews.get(pos);
        }

        @Override
        public boolean isViewFromObject(View view, Object object) {
            return view == (object);
        }

        @Override
        public Object instantiateItem(View container, int position) {
            ((ViewPager) container).addView(mListViews.get(position), 0);
            return mListViews.get(position);
        }

        @Override
        public void destroyItem(View container, int position, Object object) {
            ((ViewPager) container).removeView(mListViews.get(position));
        }

        @Override
        public void setPrimaryItem(ViewGroup container, int position,
                Object object) {
            CustomWebView view = mListViews.get(position);
            view.fixAfterViewPagerSwipe();
        }

    }

    public class MyOnPageChangeListener implements OnPageChangeListener {

        @Override
        public void onPageSelected(int position) {
            changeTab(position);
        }

        @Override
        public void onPageScrolled(int arg0, float arg1, int arg2) {
        }

        @Override
        public void onPageScrollStateChanged(int arg0) {
        }
    }
}
