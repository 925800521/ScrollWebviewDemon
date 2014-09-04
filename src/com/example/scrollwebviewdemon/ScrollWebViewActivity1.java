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
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.view.ViewTreeObserver;
import android.view.ViewTreeObserver.OnGlobalLayoutListener;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.scrollwebviewdemon.CustomScrollView1.OnScrollViewScrollListener;
import com.example.scrollwebviewdemon.CustomWebView1.OnWebViewScrollListener;

public class ScrollWebViewActivity1 extends ActionBarActivity implements
        OnClickListener {
    private static final String TAG = "WebViewActivity";
    private ViewPager mPager;
    private LinearLayout mMenu;
    private LinearLayout mLayout;
    private CustomScrollView1 mScrollView;
    private TextView mTab1;
    private TextView mTab2;
    private TextView mTab3;
    private PagerAdapter mPagerAdapter;
    private CustomWebView1 mCurWebView;
    private boolean mNeedFixWebViewContentTruncate = false;

    private OnGlobalLayoutListener mGlobalLayoutListener = new OnGlobalLayoutListener() {
        public void onGlobalLayout() {

            int[] location = new int[2];
            mScrollView.getLocationOnScreen(location);

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

    private OnScrollViewScrollListener mOnScrollViewScrollListener = new OnScrollViewScrollListener() {
        public void onScroll(int scrollX, int scrollY, boolean clampedX,
                boolean clampedY, int direction) {
            if (clampedY) {
                if (direction < 0) {
                    mScrollView.setInterceptFlag(true);
                } else if (direction > 0) {
                    // 手指向上
                    mScrollView.setInterceptFlag(false);
                    int velocity = mScrollView.getVelocity();
                    if (velocity != 0)
                        mCurWebView.flingScroll(0, Math.abs(velocity));
                }
            } else {
                if (mNeedFixWebViewContentTruncate) {
                    fixWebViewContentTruncate();
                    mNeedFixWebViewContentTruncate = false;
                }
            }
        }
    };

    private OnWebViewScrollListener mOnWebViewScrollListener = new OnWebViewScrollListener() {
        public void onScroll(int scrollX, int scrollY, boolean clampedX,
                boolean clampedY, int direction) {
            if (clampedY) {
                if (direction < 0) {
                    mScrollView.setInterceptFlag(true);
                    int velocity = mScrollView.getVelocity();
                    if (velocity != 0)
                        mCurWebView.flingScroll(0, -velocity);

                } else if (direction > 0) {
                    // 手指向上
                    mScrollView.setInterceptFlag(false);
                }
            } else {
                if (!mNeedFixWebViewContentTruncate) {
                    mNeedFixWebViewContentTruncate = true;
                }
            }
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_scrollwebview1);
        init();
    }

    public void init() {
        mMenu = (LinearLayout) findViewById(R.id.tab_group);
        mLayout = (LinearLayout) findViewById(R.id.main_page);
        mScrollView = (CustomScrollView1) findViewById(R.id.scroll_view);
        mScrollView.setOnScrollViewScrollListener(mOnScrollViewScrollListener);

        mTab1 = (TextView) findViewById(R.id.tab1);
        mTab2 = (TextView) findViewById(R.id.tab2);
        mTab3 = (TextView) findViewById(R.id.tab3);
        mTab1.setOnClickListener(this);
        mTab2.setOnClickListener(this);
        mTab3.setOnClickListener(this);

        List<CustomWebView1> views = new ArrayList<CustomWebView1>();

        View v1 = getLayoutInflater().inflate(R.layout.webview1, null);
        View v2 = getLayoutInflater().inflate(R.layout.webview1, null);
        View v3 = getLayoutInflater().inflate(R.layout.webview1, null);

        CustomWebView1 webView1 = (CustomWebView1) v1
                .findViewById(R.id.webview);
        webView1.getSettings().setJavaScriptEnabled(true);
        webView1.loadUrl("file:///android_asset/list.html");
        webView1.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
        webView1.setOnWebViewScrollListener(mOnWebViewScrollListener);

        CustomWebView1 webView2 = (CustomWebView1) v2
                .findViewById(R.id.webview);
        webView2.getSettings().setJavaScriptEnabled(true);
        webView2.loadUrl("file:///android_asset/list.html");
        webView2.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
        webView2.setOnWebViewScrollListener(mOnWebViewScrollListener);

        CustomWebView1 webView3 = (CustomWebView1) v3
                .findViewById(R.id.webview);
        webView3.getSettings().setJavaScriptEnabled(true);
        webView3.loadUrl("http://a.9game.cn/category/hot/97_0_1.html");
        webView3.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
        webView3.setOnWebViewScrollListener(mOnWebViewScrollListener);

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
            CustomWebView1 v = null;
            for (int i = 0; i < mPagerAdapter.getCount(); ++i) {
                v = ((WebAdapter) mPagerAdapter).getWebView(i);
                if (v.getScrollY() > 1) {
                    v.scrollTo(0, 0);
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
        private List<CustomWebView1> mListViews;

        public WebAdapter(List<CustomWebView1> Views) {
            mListViews = Views;
        }

        @Override
        public int getCount() {
            return mListViews.size();
        }

        public CustomWebView1 getWebView(int pos) {
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
            CustomWebView1 view = mListViews.get(position);
            view.fixAfterViewPagerSwipe();
            mCurWebView = view;
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
