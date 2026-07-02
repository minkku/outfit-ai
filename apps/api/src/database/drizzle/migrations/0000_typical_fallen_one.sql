CREATE TYPE "public"."auth_provider" AS ENUM('email', 'google');--> statement-breakpoint
CREATE TYPE "public"."clothing_category" AS ENUM('top', 'bottom', 'outer', 'shoes', 'accessory');--> statement-breakpoint
CREATE TYPE "public"."season_name" AS ENUM('spring', 'summer', 'fall', 'winter');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"avatar_url" text,
	"provider" "auth_provider" DEFAULT 'email' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "brands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "brands_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "closet_item_colors" (
	"closet_item_id" uuid NOT NULL,
	"color_id" uuid NOT NULL,
	CONSTRAINT "closet_item_colors_closet_item_id_color_id_pk" PRIMARY KEY("closet_item_id","color_id")
);
--> statement-breakpoint
CREATE TABLE "closet_item_seasons" (
	"closet_item_id" uuid NOT NULL,
	"season_id" uuid NOT NULL,
	CONSTRAINT "closet_item_seasons_closet_item_id_season_id_pk" PRIMARY KEY("closet_item_id","season_id")
);
--> statement-breakpoint
CREATE TABLE "closet_item_style_tags" (
	"closet_item_id" uuid NOT NULL,
	"style_tag_id" uuid NOT NULL,
	CONSTRAINT "closet_item_style_tags_closet_item_id_style_tag_id_pk" PRIMARY KEY("closet_item_id","style_tag_id")
);
--> statement-breakpoint
CREATE TABLE "closet_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"brand_id" uuid,
	"image_url" text NOT NULL,
	"category" "clothing_category" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "colors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"hex_code" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seasons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" "season_name" NOT NULL,
	CONSTRAINT "seasons_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "style_tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "style_tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "outfit_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"outfit_id" uuid NOT NULL,
	"closet_item_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "outfits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text,
	"note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "closet_item_colors" ADD CONSTRAINT "closet_item_colors_closet_item_id_closet_items_id_fk" FOREIGN KEY ("closet_item_id") REFERENCES "public"."closet_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "closet_item_colors" ADD CONSTRAINT "closet_item_colors_color_id_colors_id_fk" FOREIGN KEY ("color_id") REFERENCES "public"."colors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "closet_item_seasons" ADD CONSTRAINT "closet_item_seasons_closet_item_id_closet_items_id_fk" FOREIGN KEY ("closet_item_id") REFERENCES "public"."closet_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "closet_item_seasons" ADD CONSTRAINT "closet_item_seasons_season_id_seasons_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."seasons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "closet_item_style_tags" ADD CONSTRAINT "closet_item_style_tags_closet_item_id_closet_items_id_fk" FOREIGN KEY ("closet_item_id") REFERENCES "public"."closet_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "closet_item_style_tags" ADD CONSTRAINT "closet_item_style_tags_style_tag_id_style_tags_id_fk" FOREIGN KEY ("style_tag_id") REFERENCES "public"."style_tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "closet_items" ADD CONSTRAINT "closet_items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "closet_items" ADD CONSTRAINT "closet_items_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outfit_items" ADD CONSTRAINT "outfit_items_outfit_id_outfits_id_fk" FOREIGN KEY ("outfit_id") REFERENCES "public"."outfits"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outfit_items" ADD CONSTRAINT "outfit_items_closet_item_id_closet_items_id_fk" FOREIGN KEY ("closet_item_id") REFERENCES "public"."closet_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outfits" ADD CONSTRAINT "outfits_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;