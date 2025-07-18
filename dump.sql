PGDMP                      }            student_app_db    17.2    17.2     3           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            4           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            5           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            6           1262    32780    student_app_db    DATABASE     �   CREATE DATABASE student_app_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE student_app_db;
                     postgres    false            �            1259    32794    marks    TABLE     �  CREATE TABLE public.marks (
    mark_id integer NOT NULL,
    student_id integer NOT NULL,
    subject character varying(100) NOT NULL,
    mark numeric(5,2),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT marks_mark_check CHECK (((mark >= (0)::numeric) AND (mark <= (100)::numeric)))
);
    DROP TABLE public.marks;
       public         heap r       postgres    false            �            1259    32793    marks_mark_id_seq    SEQUENCE     �   CREATE SEQUENCE public.marks_mark_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.marks_mark_id_seq;
       public               postgres    false    220            7           0    0    marks_mark_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.marks_mark_id_seq OWNED BY public.marks.mark_id;
          public               postgres    false    219            �            1259    32782    students    TABLE     n  CREATE TABLE public.students (
    student_id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    date_of_birth date NOT NULL,
    gender character varying(10) NOT NULL,
    email character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    class character varying(15),
    CONSTRAINT students_gender_check CHECK (((gender)::text = ANY ((ARRAY['Male'::character varying, 'Female'::character varying, 'Other'::character varying])::text[])))
);
    DROP TABLE public.students;
       public         heap r       postgres    false            �            1259    32781    students_student_id_seq    SEQUENCE     �   CREATE SEQUENCE public.students_student_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.students_student_id_seq;
       public               postgres    false    218            8           0    0    students_student_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.students_student_id_seq OWNED BY public.students.student_id;
          public               postgres    false    217            �           2604    32797    marks mark_id    DEFAULT     n   ALTER TABLE ONLY public.marks ALTER COLUMN mark_id SET DEFAULT nextval('public.marks_mark_id_seq'::regclass);
 <   ALTER TABLE public.marks ALTER COLUMN mark_id DROP DEFAULT;
       public               postgres    false    219    220    220            �           2604    32785    students student_id    DEFAULT     z   ALTER TABLE ONLY public.students ALTER COLUMN student_id SET DEFAULT nextval('public.students_student_id_seq'::regclass);
 B   ALTER TABLE public.students ALTER COLUMN student_id DROP DEFAULT;
       public               postgres    false    218    217    218            0          0    32794    marks 
   TABLE DATA           [   COPY public.marks (mark_id, student_id, subject, mark, created_at, updated_at) FROM stdin;
    public               postgres    false    220   E       .          0    32782    students 
   TABLE DATA           �   COPY public.students (student_id, first_name, last_name, date_of_birth, gender, email, created_at, updated_at, class) FROM stdin;
    public               postgres    false    218   I       9           0    0    marks_mark_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.marks_mark_id_seq', 39, true);
          public               postgres    false    219            :           0    0    students_student_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.students_student_id_seq', 16, true);
          public               postgres    false    217            �           2606    32802    marks marks_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.marks
    ADD CONSTRAINT marks_pkey PRIMARY KEY (mark_id);
 :   ALTER TABLE ONLY public.marks DROP CONSTRAINT marks_pkey;
       public                 postgres    false    220            �           2606    32792    students students_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_email_key UNIQUE (email);
 E   ALTER TABLE ONLY public.students DROP CONSTRAINT students_email_key;
       public                 postgres    false    218            �           2606    32790    students students_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (student_id);
 @   ALTER TABLE ONLY public.students DROP CONSTRAINT students_pkey;
       public                 postgres    false    218            �           2606    40961    marks unique_student_subject 
   CONSTRAINT     f   ALTER TABLE ONLY public.marks
    ADD CONSTRAINT unique_student_subject UNIQUE (student_id, subject);
 F   ALTER TABLE ONLY public.marks DROP CONSTRAINT unique_student_subject;
       public                 postgres    false    220    220            �           2606    32803    marks marks_student_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.marks
    ADD CONSTRAINT marks_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(student_id) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.marks DROP CONSTRAINT marks_student_id_fkey;
       public               postgres    false    220    4758    218            0   �   x�}�Mj!���)r��O�<DN0��	�d6����iH�}���,L%|޾��)�(�^�^�^��r�BhN�]��x�ؿ�P�&Cʺ@��M������SR��:փ5Q$�J�@к4ͬ�fv��@�$��?�'r^ ��(�y��*ɽ,�vͤ��xa��@����_�/�J�F��]>î�OA�������xE��f�@;fs��x��0)�M��݋�������� ?+���      .   �   x�}Ͻ�0F�ZL��d��,�Ҙ@���0��R�վ�~"º�����)R�$<\_�+�RV��7��xM0�NQ�\�XZ�-�`���XҡM(�njG��z�����07f+�HԒ�X:5�a���B����ҁ t�ස0�����	֎�Z�EN��,�̆=E�$?��f|     