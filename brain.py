# import os
# import time
# import feedparser
# from supabase import create_client
# from openai import OpenAI
# from dotenv import load_dotenv

# # გარემოს ცვლადების ჩატვირთვა
# load_dotenv()

# # ინიციალიზაცია
# supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_KEY"))
# ai = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# def get_current_post_score():
#     """იღებს საიტზე არსებული პოსტის ქულას. თუ არ არსებობს, აბრუნებს 0-ს."""
#     try:
#         res = supabase.table("posts").select("score").eq("is_current", True).execute()
#         # ნაცვლად .single()-ისა, ვიყენებთ .execute()-ს და ვამოწმებთ სიას
#         if res.data and len(res.data) > 0:
#             return float(res.data[0]['score'])
#         return 0.0
#     except Exception as e:
#         print(f"ქულის წამოღების შეცდომა: {e}")
#         return 0.0

# def evaluate_news(news_title, news_content):
#     """AI აფასებს ამბის მნიშვნელობას 1-დან 10-მდე."""
#     try:
#         prompt = f"შეაფასე ამ ამბის მნიშვნელობა 1-დან 10-მდე. სათაური: {news_title}. ტექსტი: {news_content[:500]}. დააბრუნე მხოლოდ ციფრი (მაგ: 7.5)."
        
#         response = ai.chat.completions.create(
#             model="gpt-4o",
#             messages=[{"role": "system", "content": "შენ ხარ Sulertia Media-ს მთავარი რედაქტორი. აბრუნებ მხოლოდ ციფრს."},
#                       {"role": "user", "content": prompt}]
#         )
#         score_str = response.choices[0].message.content.strip()
#         return float(score_str)
#     except:
#         return 1.0 # შეცდომის შემთხვევაში მინიმალური ქულა

# def summarize_post(title, content):
#     """ამბის რეზიუმირება Sulertia-ს სტილში."""
#     prompt = f"დაწერე 1 მოკლე, მინიმალისტური აბზაცი ქართულად ამ ამბის შესახებ. სათაური: {title}. კონტექსტი: {content[:500]}"
    
#     response = ai.chat.completions.create(
#         model="gpt-4o",
#         messages=[{"role": "user", "content": prompt}]
#     )
#     return response.choices[0].message.content.strip()

# def update_platform(new_post_data):
#     """ბაზის განახლება მინიმალური რისკით."""
#     try:
#         # 1. ძველ პოსტებს ვუხსნით მიმდინარე სტატუსს
#         supabase.table("posts").update({"is_current": False}).eq("is_current", True).execute()
        
#         # 2. ვამატებთ ახალს
#         supabase.table("posts").insert({**new_post_data, "is_current": True}).execute()
#         print(f"🔥 ახალი პოსტი განთავსდა: {new_post_data['title']} (Score: {new_post_data['score']})")
#     except Exception as e:
#         print(f"ბაზაში განახლების შეცდომა: {e}")

# def run_brain():
#     print("Sulertia Brain გაშვებულია და უსმენს სამყაროს...")
#     while True:
#         try:
#             feed = feedparser.parse("https://news.google.com/rss?hl=ka&gl=GE&ceid=GE:ka")
#             if not feed.entries:
#                 print("ამბები ვერ მოიძებნა, ვცდი ისევ...")
#                 time.sleep(60)
#                 continue

#             latest_news = feed.entries[0]
            
#             s_current = get_current_post_score()
#             s_new = evaluate_news(latest_news.title, latest_news.summary)
            
#             print(f"ანალიზი: მიმდინარე {s_current} VS ახალი {s_new}")

#             if s_new > s_current:
#                 print(f"აღმოჩენილია უფრო მაღალი ქულა! ვამზადებ პოსტს...")
#                 summary = summarize_post(latest_news.title, latest_news.summary)
                
#                 update_platform({
#                     "title": latest_news.title,
#                     "summary": summary,
#                     "score": s_new,
#                     "category": "Hot News"
#                 })
#             else:
#                 print("ახალი ამბავი არ არის საკმარისად პრიორიტეტული.")
            
#         except Exception as e:
#             print(f"გაუთვალისწინებელი შეცდომა: {e}")
            
#         time.sleep(300) # ყოველ 5 წუთში შემოწმება

# if __name__ == "__main__":
#     run_brain()


# import os
# import time
# import feedparser
# import random # დავამატოთ ტესტირებისთვის
# from supabase import create_client
# from openai import OpenAI
# from dotenv import load_dotenv

# load_dotenv()

# supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_KEY"))
# ai = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# # შეცვალე True-ზე, თუ გინდა OpenAI-ს გარეშე დატესტო (უფასოდ)
# DEVELOPMENT_MODE = False 

# def get_current_post_score():
#     try:
#         res = supabase.table("posts").select("score").eq("is_current", True).execute()
#         if res.data and len(res.data) > 0:
#             return float(res.data[0]['score'])
#         return 0.0
#     except Exception as e:
#         print(f"❌ ბაზიდან ქულის წამოღება ვერ მოხერხდა: {e}")
#         return 0.0

# def evaluate_news(news_title, news_content):
#     if DEVELOPMENT_MODE:
#         return round(random.uniform(1, 10), 1) # აბრუნებს შემთხვევით ციფრს 1-დან 10-მდე
    
#     try:
#         prompt = f"შეაფასე ამბის მნიშვნელობა (1-10). სათაური: {news_title}. ტექსტი: {news_content[:500]}"
#         response = ai.chat.completions.create(
#             model="gpt-4o",
#             messages=[{"role": "system", "content": "დააბრუნე მხოლოდ ციფრი."},
#                       {"role": "user", "content": prompt}]
#         )
#         return float(response.choices[0].message.content.strip())
#     except Exception as e:
#         if "insufficient_quota" in str(e):
#             print("⚠️ OpenAI ბალანსი ცარიელია! გადავდივარ დეველოპერულ რეჟიმში...")
#             return round(random.uniform(1, 10), 1)
#         return 1.0

# def summarize_post(title, content):
#     if DEVELOPMENT_MODE:
#         return f"ეს არის სატესტო რეზიუმე ამბისთვის: {title}"

#     try:
#         prompt = f"დაწერე 1 მოკლე ქართული აბზაცი ამბისთვის: {title}. კონტექსტი: {content[:500]}"
#         response = ai.chat.completions.create(
#             model="gpt-4o",
#             messages=[{"role": "user", "content": prompt}]
#         )
#         return response.choices[0].message.content.strip()
#     except:
#         return f"რეზიუმეს მომზადება ვერ მოხერხდა (OpenAI Error). ორიგინალი სათაური: {title}"

# def update_platform(new_post_data):
#     try:
#         # ძველის დაარქივება
#         supabase.table("posts").update({"is_current": False}).eq("is_current", True).execute()
#         # ახლის დამატება
#         supabase.table("posts").insert({**new_post_data, "is_current": True}).execute()
#         print(f"✅ პლატფორმა განახლდა: {new_post_data['title']}")
#     except Exception as e:
#         print(f"❌ ბაზის განახლების შეცდომა: {e}")

# def run_brain():
#     print("🚀 Sulertia Brain გაშვებულია...")
#     while True:
#         try:
#             feed = feedparser.parse("https://news.google.com/rss?hl=ka&gl=GE&ceid=GE:ka")
#             if feed.entries:
#                 latest_news = feed.entries[0]
#                 s_current = get_current_post_score()
#                 s_new = evaluate_news(latest_news.title, latest_news.summary)
                
#                 print(f"📊 ანალიზი: მიმდინარე {s_current} | ახალი {s_new}")

#                 if s_new > s_current:
#                     print("✨ ნაპოვნია უფრო პრიორიტეტული ამბავი!")
#                     summary = summarize_post(latest_news.title, latest_news.summary)
#                     update_platform({
#                         "title": latest_news.title,
#                         "summary": summary,
#                         "score": s_new,
#                         "category": "Hot News"
#                     })
#                 else:
#                     print("😴 სიახლე არ არის საკმარისად მნიშვნელოვანი.")
            
#         except Exception as e:
#             print(f"❗ მოულოდნელი შეცდომა: {e}")
            
#         time.sleep(300)

# if __name__ == "__main__":
#     run_brain()

import os
import time
import feedparser
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from supabase import create_client
#from openai import OpenAI - OpenAI-ის ნაცვლად გამოვიყენოთ GROQ (უფასო ვერსია)
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

# ინიციალიზაცია
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_KEY"))
#ai = OpenAI(api_key=os.getenv("OPENAI_API_KEY")) - OpenAI-ის ნაცვლად გამოვიყენოთ GROQ (უფასო ვერსია)
ai = Groq(api_key=os.getenv("GROQ_API_KEY"))

# წყაროების სია
SOURCES = [
    "https://openai.com/news/rss.xml",
    "https://deepmind.google/blog/rss.xml",
    "https://huggingface.co/blog/feed.xml",
    "https://importai.substack.com/feed",
    "https://www.anthropic.com/news" # სკრაპინგისთვის
]

def fetch_anthropic_news():
    """სპეციალური ფუნქცია Anthropic-ის სიახლეებისთვის"""
    try:
        r = requests.get("https://www.anthropic.com/news")
        soup = BeautifulSoup(r.text, 'html.parser')
        latest_news = soup.find('a', href=True) # უახლესი ლინკი
        title = latest_news.text if latest_news else "No title"
        return [{"title": title, "link": "https://www.anthropic.com" + latest_news['href'], "summary": "Anthropic update"}]
    except:
        return []

def evaluate_importance(title, summary):
    """AI აფასებს ამბის პრიორიტეტს 1-100 ბალიანი სისტემით"""
    prompt = f"""შეაფასე ამ AI ამბის მნიშვნელობა 1-დან 100-მდე.
    კრიტერიუმები: ტექნოლოგიური გარღვევა, გავლენა კაცობრიობაზე, სიახლე.
    ამბავი: {title} - {summary}
    დააბრუნე მხოლოდ ციფრი."""
    
    response = ai.chat.completions.create(
        #model="gpt-4o", - OpenAI-ის ნაცვლად გამოვიყენოთ GROQ (უფასო ვერსია)
        model="llama-3.3-70b-versatile",
        messages=[{"role": "system", "content": "შენ ხარ ექსპერტი AI ანალიტიკოსი."},
                  {"role": "user", "content": prompt}]
    )
    return int(response.choices[0].message.content.strip())

def generate_human_post(title, summary):
    """ქმნის ადამიანურ, მინიმალისტურ ტექსტს"""
    prompt = f"""დაწერე 1 მოკლე, მინიმალისტური და ძალიან ადამიანური აბზაცი ქართულად ამ ამბის შესახებ.
    არ გამოიყენო ფორმალური 'რობოტული' სიტყვები. ისაუბრე როგორც 'ინსაიდერმა'.
    მაქსიმუმ 3-4 წინადადება.
    ორიგინალი: {title} - {summary}"""
    
    response = ai.chat.completions.create(
        #model="gpt-4o",
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content.strip()

def run_brain():
    print("Sulertia Media: AI რედაქტორი ჩართულია...")
    
    while True:
        all_stories = []
        
        # 1. ინფორმაციის შეგროვება
        for url in SOURCES:
            if "rss" in url or "feed" in url or "substack" in url:
                feed = feedparser.parse(url)
                for entry in feed.entries[:3]:
                    all_stories.append({
                        "title": getattr(entry, 'title', ''),
                        "summary": getattr(entry, 'summary', '')
                    })
            elif "anthropic" in url:
                all_stories.extend(fetch_anthropic_news())

        # 2. საუკეთესოს შერჩევა
        best_story = None
        max_score = -1

        for story in all_stories:
            title = story.get('title', '')
            summary = story.get('summary', '')
            score = evaluate_importance(title, summary)
            if score > max_score:
                max_score = score
                best_story = story

        # 3. პოსტვა
        if best_story:
            content = generate_human_post(best_story['title'], best_story['summary'])
            # ფოტოს გენერაცია Cyber-Minimalism სტილში
            # image_url = generate_ai_image(best_story['title'])
            
            # update_platform(...)
            print(f"დღის გამარჯვებული: {best_story['title']} (Score: {max_score})")
        
        time.sleep(3600 * 12)

if __name__ == "__main__":
    run_brain()