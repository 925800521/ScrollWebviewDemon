package com.example.scrollwebviewdemon;

import java.util.ArrayList;
import java.util.List;

import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v4.view.ViewPager.OnPageChangeListener;
import android.support.v7.app.ActionBarActivity;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.TextView;

public class NormalActivity extends ActionBarActivity implements
        OnClickListener {

    private static final String TAG = "WebViewActivity";
    private ViewPager mPager;
    private TextView mTab1;
    private TextView mTab2;
    private TextView mTab3;
    private PagerAdapter mPagerAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_webview);
        init();
    }

    public void init() {
        mTab1 = (TextView) findViewById(R.id.tab1);
        mTab2 = (TextView) findViewById(R.id.tab2);
        mTab3 = (TextView) findViewById(R.id.tab3);
        mTab1.setOnClickListener(this);
        mTab2.setOnClickListener(this);
        mTab3.setOnClickListener(this);

        List<View> views = new ArrayList<View>();
        views.add(getLayoutInflater().inflate(R.layout.pager_1, null));
        views.add(getLayoutInflater().inflate(R.layout.pager_2, null));
        views.add(getLayoutInflater().inflate(R.layout.pager_3, null));
        mPagerAdapter = new WebAdapter(views);
        mPager = (ViewPager) findViewById(R.id.view_pager);
        mPager.setAdapter(mPagerAdapter);
        mPager.setCurrentItem(0);
        changeTab(0);
        mPager.setOnPageChangeListener(new MyOnPageChangeListener());
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
        private List<View> mListViews;

        public WebAdapter(List<View> Views) {
            mListViews = Views;
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
