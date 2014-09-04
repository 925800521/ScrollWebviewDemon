package com.example.scrollwebviewdemon;

import java.util.ArrayList;
import java.util.List;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v4.view.ViewPager.OnPageChangeListener;
import android.support.v7.app.ActionBarActivity;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.webkit.WebView;
import android.widget.AbsListView;
import android.widget.AbsListView.OnScrollListener;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.example.scrollwebviewdemon.CustomWebView.OnScrollTopListener;
import com.example.scrollwebviewdemon.view.XListView.IXListViewListener;

public class ListWebViewActivity extends ActionBarActivity implements
        OnClickListener {

    private ViewPager mPager;
    private LinearLayout mMenu;
    private LinearLayout mMenuInList;

    private PagerAdapter mPagerAdapter;
    private CustomListView mListView;
    private DataAdapter mAdapter;
    private boolean mIsScrollManually = false;

    // viewpager 在 listview 中的位置。
    private final int VIEWPAGER_POSITION = 2;

    private OnScrollTopListener mWebViewListener = new OnScrollTopListener() {
        @Override
        public void onScrollTop() {
            if (!mListView.getInterceptTouchEventFlag()) {
                Log.e("onScrollTop", "setInterceptTouchEventFlag");
                mListView.setInterceptTouchEventFlag(true);
                fixWebViewContentTruncate();

                // fix onScrollTop之后，listview 负责处理事件后，webview不能再下拉的情况
                mListView.setSelectionFromTop(VIEWPAGER_POSITION, 1);
                mIsScrollManually = true;

            }
        }
    };

    IXListViewListener mIxListViewListener = new IXListViewListener() {
        public void onRefresh() {
            Toast.makeText(ListWebViewActivity.this, "Refresh",
                    Toast.LENGTH_SHORT).show();

            new Handler().postDelayed(new Runnable() {

                @Override
                public void run() {
                    // TODO Auto-generated method stub
                    mListView.stopRefresh();
                }
            }, 2000);
        }

        public void onLoadMore() {
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_listwebview);
        init();
    }

    public void init() {

        mMenu = (LinearLayout) findViewById(R.id.menu_tab);
        ((TextView) mMenu.findViewById(R.id.tab1)).setOnClickListener(this);
        ((TextView) mMenu.findViewById(R.id.tab2)).setOnClickListener(this);
        ((TextView) mMenu.findViewById(R.id.tab3)).setOnClickListener(this);

        mAdapter = new DataAdapter(this);
        mListView = (CustomListView) findViewById(R.id.list);
        View headView = LayoutInflater.from(this).inflate(
                R.layout.listwebview_header, null);
        mListView.addHeaderView(headView);
        mListView.setAdapter(mAdapter);

        mListView.setPullRefreshEnable(true);
        mListView.setPullLoadEnable(false);
        mListView.setXListViewListener(mIxListViewListener);

        mListView.setOnScrollListener(new OnScrollListener() {

            @Override
            public void onScrollStateChanged(AbsListView view, int scrollState) {
            }

            @Override
            public void onScroll(AbsListView view, int firstVisibleItem,
                    int visibleItemCount, int totalItemCount) {
                if (mIsScrollManually) {
                    mIsScrollManually = false;
                    // 忽略手动scroll
                    return;
                }
                // Log.e("list", "onScroll-firstVisibleItem:" +
                // firstVisibleItem);
                if (firstVisibleItem < VIEWPAGER_POSITION) {
                    if (!mListView.getInterceptTouchEventFlag()) {
                        mListView.setInterceptTouchEventFlag(true);
                        fixWebViewContentTruncate();
                    }
                } else {
                    if (mListView.getInterceptTouchEventFlag()) {
                        mListView.setInterceptTouchEventFlag(false);
                        // fix webview.onscrollchanged 不被调用的问题
                        CustomWebView v = ((WebAdapter) mPagerAdapter)
                                .getWebView(mPager.getCurrentItem());
                        

                        Log.e("*********", String.format("flingScroll (%d,%d)",
                                0, (int) mListView.mVelocityY));

                        if (mListView.mVelocityY != 0) {
                            v.flingScroll(0,
                                    Math.abs((int) mListView.mVelocityY));
                            mListView.mVelocityY = 0;
                        } else {
                            v.scrollTo(0, v.getScrollY() + 1);
                        }
                    }
                }
                int menuVisibility = firstVisibleItem >= VIEWPAGER_POSITION ? View.VISIBLE
                        : View.INVISIBLE;
                if (menuVisibility != mMenu.getVisibility()) {
                    mMenu.setVisibility(menuVisibility);
                }
            }
        });
        mAdapter.add("ViewPager");
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
        if (mMenu != null)
            changeTabImpl(mMenu, position);
        if (mMenuInList != null)
            changeTabImpl(mMenuInList, position);
    }

    public void changeTabImpl(ViewGroup viewGroup, int position) {
        switch (position) {
        case 0:
            ((TextView) viewGroup.findViewById(R.id.tab1))
                    .setBackgroundColor(Color.GRAY);
            ((TextView) viewGroup.findViewById(R.id.tab2))
                    .setBackgroundColor(Color.WHITE);
            ((TextView) viewGroup.findViewById(R.id.tab3))
                    .setBackgroundColor(Color.WHITE);
            break;
        case 1:
            ((TextView) viewGroup.findViewById(R.id.tab1))
                    .setBackgroundColor(Color.WHITE);
            ((TextView) viewGroup.findViewById(R.id.tab2))
                    .setBackgroundColor(Color.GRAY);
            ((TextView) viewGroup.findViewById(R.id.tab3))
                    .setBackgroundColor(Color.WHITE);
            break;
        case 2:
            ((TextView) viewGroup.findViewById(R.id.tab1))
                    .setBackgroundColor(Color.WHITE);
            ((TextView) viewGroup.findViewById(R.id.tab2))
                    .setBackgroundColor(Color.WHITE);
            ((TextView) viewGroup.findViewById(R.id.tab3))
                    .setBackgroundColor(Color.GRAY);
            break;

        default:
            break;
        }
    }

    public class WebAdapter extends PagerAdapter {
        public List<CustomWebView> mListViews;

        public WebAdapter(List<CustomWebView> Views) {
            mListViews = Views;
        }

        public CustomWebView getWebView(int pos) {
            return mListViews.get(pos);
        }

        @Override
        public int getCount() {
            return mListViews.size();
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

    public class DataAdapter extends ArrayAdapter<String> {

        private LayoutInflater mLayoutInflater;

        public DataAdapter(Context context) {
            super(context, 0);
            mLayoutInflater = LayoutInflater.from(context);
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {

            if (convertView == null) {
                convertView = mLayoutInflater.inflate(
                        R.layout.listwebview_item, parent, false);
                mMenuInList = (LinearLayout) convertView
                        .findViewById(R.id.menu_tab);
                ((TextView) mMenuInList.findViewById(R.id.tab1))
                        .setOnClickListener(ListWebViewActivity.this);
                ((TextView) mMenuInList.findViewById(R.id.tab2))
                        .setOnClickListener(ListWebViewActivity.this);
                ((TextView) mMenuInList.findViewById(R.id.tab3))
                        .setOnClickListener(ListWebViewActivity.this);

                initViewPager(convertView);
            }

            return convertView;

        }

        @SuppressLint("NewApi")
        public void initViewPager(View parent) {
            List<CustomWebView> views = new ArrayList<CustomWebView>();

            View v1 = getLayoutInflater().inflate(R.layout.webview, null);
            View v2 = getLayoutInflater().inflate(R.layout.webview, null);
            View v3 = getLayoutInflater().inflate(R.layout.webview, null);

            CustomWebView webView1 = (CustomWebView) v1
                    .findViewById(R.id.webview);
            webView1.setOnScrollTopListener(mWebViewListener);
            webView1.getSettings().setJavaScriptEnabled(true);
            if (Build.VERSION.SDK_INT >= 11) {
                webView1.setLayerType(WebView.LAYER_TYPE_SOFTWARE, null);
            }
            // webView1.loadUrl("http://a.9game.cn/hot/0_0/");
            webView1.loadUrl(" file:///android_asset/list.html ");
            Log.e("initViewPager", "" + webView1.getContentHeight() + "-"
                    + webView1.getScrollY() + webView1.getHeight());
            CustomWebView webView2 = (CustomWebView) v2
                    .findViewById(R.id.webview);
            webView2.getSettings().setJavaScriptEnabled(true);
            if (Build.VERSION.SDK_INT >= 11) {
                webView2.setLayerType(WebView.LAYER_TYPE_SOFTWARE, null);
            }
            webView2.setOnScrollTopListener(mWebViewListener);
            // webView2.loadUrl("http://a.9game.cn/hot/2_0/");
            webView2.loadUrl(" file:///android_asset/list.html ");

            CustomWebView webView3 = (CustomWebView) v3
                    .findViewById(R.id.webview);
            webView3.getSettings().setJavaScriptEnabled(true);
            if (Build.VERSION.SDK_INT >= 11) {
                webView3.setLayerType(WebView.LAYER_TYPE_SOFTWARE, null);
            }
            webView3.setOnScrollTopListener(mWebViewListener);
            webView3.loadUrl("http://a.9game.cn/category/hot/97_0_1.html");

            views.add(webView1);
            views.add(webView2);
            views.add(webView3);
            mPagerAdapter = new WebAdapter(views);
            mPager = (ViewPager) parent.findViewById(R.id.view_pager);
            mPager.setAdapter(mPagerAdapter);

            resetViewPagerHeight();

            mPager.setCurrentItem(0);
            changeTab(0);
            mPager.setOnPageChangeListener(new MyOnPageChangeListener());
        }
    }

    public void resetViewPagerHeight() {
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.MATCH_PARENT);
        int[] location = new int[2];
        mMenu.getLocationOnScreen(location);
        int[] location1 = new int[2];
        mListView.getLocationOnScreen(location1);
        DisplayMetrics dm = new DisplayMetrics();
        getWindowManager().getDefaultDisplay().getMetrics(dm);
        params.height = dm.heightPixels - location[1]
                - getResources().getDimensionPixelSize(R.dimen.tab_menu_height);
        mPager.setLayoutParams(params);

        Log.e("---------",
                String.format(
                        "menu-location(%d,%d),listview-location(%d,%d)-height:%d meaure height:%d dimen:%d,screen height:%d",
                        location[0],
                        location[1],
                        location1[0],
                        location1[1],
                        mMenu.getHeight(),
                        mMenu.getMeasuredHeight(),
                        getResources().getDimensionPixelSize(
                                R.dimen.tab_menu_height), dm.heightPixels));
    }

}
